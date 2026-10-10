// Forum data for the list pages (home, discussions, polls, members, insights),
// shaped like the props those pages' components already take. Each loader
// returns null when Discourse is not configured or fails, so the page keeps
// its sample data.
import { connection } from 'next/server';
import { avatarUrl, discourseFetch, isDiscourseConfigured } from './client';
import { compactNumber, timeAgo } from './format';
import { mapPolls } from './mappers';

const isAboutTopic = (t) => /^About the .+ category$/i.test(t.title);

// Discourse keeps emoji as :shortcodes: and ends excerpts with an HTML entity.
const cleanTitle = (title = '') => title.replace(/\s*:[a-z0-9_+-]+:/gi, '').trim();
const cleanExcerpt = (excerpt = '') =>
  excerpt
    .replace(/&hellip;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;/g, '’')
    .replace(/\s*:[a-z0-9_+-]+:/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

async function safely(label, load) {
  // Render at request time: the lists change whenever someone posts, and the
  // forum settings may only exist at runtime (not during the build).
  await connection();
  if (!isDiscourseConfigured()) return null;
  try {
    return await load();
  } catch (error) {
    console.error(`Could not load ${label} from Discourse`, error);
    return null;
  }
}

async function loadCategories() {
  const data = await discourseFetch('/categories.json');
  return (data.category_list?.categories || []).filter((c) => !c.read_restricted && c.slug !== 'uncategorized');
}

// Profiles and site stats change slowly; cache them longer to spare the rate limit.
const PROFILE_SECONDS = 300;

const findCategory = (categories, pattern) => categories.find((c) => pattern.test(c.name));
const categoryPath = (c) => `/c/${encodeURIComponent(c.slug)}/${c.id}.json`;
const topicsOf = (list) => (list?.topic_list?.topics || []).filter((t) => !isAboutTopic(t));

function topicMapper(list, categoriesById) {
  const users = new Map((list.users || []).map((u) => [u.id, u]));
  return (t) => {
    const op = users.get(t.posters?.[0]?.user_id);
    return {
      id: t.id,
      title: cleanTitle(t.title),
      description: cleanExcerpt(t.excerpt),
      image: t.image_url || null,
      author: { name: op?.name || op?.username || 'Member', avatar: avatarUrl(op?.avatar_template) },
      authorIsStaff: Boolean(op?.admin || op?.moderator),
      timeAgo: timeAgo(t.created_at),
      createdAt: t.created_at,
      category: categoriesById.get(t.category_id)?.name || '',
      pinned: Boolean(t.pinned),
      views: t.views ?? null,
      replies: Math.max(0, (t.posts_count || 1) - 1),
      likes: t.like_count || 0,
      tags: (t.tags || []).map((tag) => (typeof tag === 'string' ? tag : tag.name)),
      lastActivity: timeAgo(t.last_posted_at || t.bumped_at || t.created_at),
    };
  };
}

// Site Feedback topics are notes to the team, so they stay out of the public lists.
const isFeedback = (t, categoriesById) => /feedback/i.test(categoriesById.get(t.category_id)?.name || '');
const mapList = (list, categoriesById) =>
  topicsOf(list).filter((t) => !isFeedback(t, categoriesById)).map(topicMapper(list, categoriesById));

// Articles newest first. A category list puts pinned topics and recent
// activity ahead of new topics, so sort by when each was published.
const articlesPath = (c) => `${categoryPath(c)}?order=created`;
const newestFirst = (topics) => [...topics].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

// Members: the directory is closed to non-staff accounts on this forum, so
// fall back to the "all members" group and each member's profile summary.
async function loadMemberProfiles(limit) {
  const group = await discourseFetch(`/groups/trust_level_0/members.json?limit=${limit}&order=last_posted_at&asc=false`, { revalidate: PROFILE_SECONDS });
  const members = (group.members || []).filter((m) => m.id > 0);
  const profiles = await Promise.all(
    members.map(async (m) => {
      const name = encodeURIComponent(m.username);
      const [user, summary] = await Promise.all([
        discourseFetch(`/u/${name}.json`, { revalidate: PROFILE_SECONDS }).then((d) => d.user).catch(() => null),
        discourseFetch(`/u/${name}/summary.json`, { revalidate: PROFILE_SECONDS }).then((d) => d.user_summary).catch(() => null),
      ]);
      const about = Object.values(user?.user_fields || {}).find((v) => typeof v === 'string' && v.trim());
      return {
        id: m.id,
        username: m.username,
        name: m.name || m.username,
        avatar: avatarUrl(m.avatar_template),
        role: m.title || user?.title || (user?.admin ? 'Admin' : user?.moderator ? 'Moderator' : 'Member'),
        company: '',
        location: user?.location || '',
        expertise: [],
        bio: about || user?.bio_excerpt || '',
        stats: {
          discussions: summary?.topic_count ?? 0,
          // The summary's post count leaves out the posts that open a topic.
          contributions: (summary?.topic_count ?? 0) + (summary?.post_count ?? 0),
          followers: summary?.likes_received ?? 0,
          followersLabel: 'LIKES\nRECEIVED',
        },
      };
    }),
  );
  return profiles.sort((a, b) => b.stats.contributions - a.stats.contributions);
}

// The directory is closed to non-staff accounts. A refusal is not cached by
// fetch, so remember it rather than asking again on every page view.
let directoryClosed = false;

async function loadTopMembers(limit) {
  // Prefer the directory when this account may read it; otherwise use profiles.
  const directory = directoryClosed
    ? null
    : await discourseFetch('/directory_items.json?period=all&order=post_count', { revalidate: PROFILE_SECONDS }).catch((error) => {
        if (error?.status === 403) directoryClosed = true;
        return null;
      });
  if (directory?.directory_items?.length) {
    return directory.directory_items.slice(0, limit).map((item) => ({
      name: item.user?.name || item.user?.username,
      contributions: compactNumber(item.post_count || 0),
      avatar: avatarUrl(item.user?.avatar_template),
    }));
  }
  const profiles = await loadMemberProfiles(30);
  return profiles.slice(0, limit).map((m) => ({ name: m.name, contributions: compactNumber(m.stats.contributions), avatar: m.avatar }));
}

// Polls live in the forum's poll category (the one named "Poll"/"Polls").
async function fetchPolls(categories, limit = 12) {
  const category = findCategory(categories, /poll/i);
  if (!category) return [];

  const topics = topicsOf(await discourseFetch(categoryPath(category))).slice(0, limit);
  const details = await Promise.all(topics.map((t) => discourseFetch(`/t/${t.id}.json`).catch(() => null)));

  const polls = [];
  details.forEach((topic, i) => {
    const post = topic?.post_stream?.posts?.[0];
    const poll = post ? mapPolls(post)[0] : null;
    if (!poll) return;
    const total = poll.options.reduce((sum, o) => sum + o.votes, 0);
    const top = Math.max(...poll.options.map((o) => o.votes));
    polls.push({
      id: topics[i].id,
      topicId: topics[i].id,
      postId: post.id,
      pollName: poll.name,
      question: cleanTitle(topic.title),
      category: category.name,
      time: timeAgo(topics[i].created_at),
      voters: poll.voters,
      closed: poll.status === 'closed' || Boolean(poll.closesAt && new Date(poll.closesAt) <= new Date()),
      userVotes: poll.userVotes,
      options: poll.options.map((o) => ({
        id: o.id,
        label: o.text,
        votes: o.votes,
        percentage: `${total ? Math.round((o.votes / total) * 100) : 0}%`,
        highlighted: total > 0 && o.votes === top,
      })),
    });
  });
  return polls;
}

const mostVoted = (polls) => [...polls].sort((a, b) => (b.voters || 0) - (a.voters || 0))[0] || null;

export function loadDiscussions() {
  return safely('discussions', async () => {
    const categories = await loadCategories();
    const [latest, active, top, members, tags, polls] = await Promise.all([
      discourseFetch('/latest.json?order=created'),
      discourseFetch('/latest.json'),
      discourseFetch('/top.json?period=all'),
      loadTopMembers(6).catch(() => []),
      discourseFetch('/tags.json').catch(() => null),
      fetchPolls(categories, 6).catch(() => []),
    ]);
    const categoriesById = new Map(categories.map((c) => [c.id, c]));

    const recentlyActive = mapList(active, categoriesById)
      .slice(0, 3)
      .map((t) => ({ id: t.id, title: t.title, author: t.author.name, timeAgo: t.timeAgo, category: t.category }));
    const total = categories.reduce((sum, c) => sum + (c.topic_count || 0), 0);

    const openPolls = polls.filter((p) => !p.closed);
    const sidePoll = mostVoted(openPolls);

    return {
      // The discussions feed; the page filters it by category and trims it.
      feed: mapList(latest, categoriesById).filter((t) => !t.pinned).slice(0, 30),
      // An open poll for the feed, and the most-voted one for the sidebar.
      feedPoll: openPolls.find((p) => p !== sidePoll) || null,
      poll: sidePoll,
      latest: mapList(latest, categoriesById).slice(0, 4),
      trending: mapList(top, categoriesById).slice(0, 4),
      recentlyActive,
      categories: [
        { name: 'All categories', count: compactNumber(total), isActive: true },
        ...categories.map((c) => ({ name: c.name, count: compactNumber(c.topic_count || 0), isActive: false })),
      ],
      members,
      tags: (tags?.tags || []).slice(0, 8).map((t) => ({ name: t.text || t.name || t.id, count: t.count || 0 })),
    };
  });
}

export function loadPolls() {
  return safely('polls', async () => {
    const polls = await fetchPolls(await loadCategories());
    return { open: polls.filter((p) => !p.closed), closed: polls.filter((p) => p.closed) };
  });
}

export function loadMembers() {
  return safely('members', () => loadMemberProfiles(50));
}

// Home page: the newest article and next event, the most-voted open poll,
// the trending carousel, the forum cards, the resources carousel, the pulse
// numbers and the news list.
export function loadHome() {
  return safely('home', async () => {
    const categories = await loadCategories();
    const categoriesById = new Map(categories.map((c) => [c.id, c]));
    const articles = findCategory(categories, /article|insight/i);
    const [latest, active, top, about, polls, articleList, events] = await Promise.all([
      discourseFetch('/latest.json?order=created'),
      discourseFetch('/latest.json'),
      discourseFetch('/top.json?period=all'),
      discourseFetch('/about.json', { revalidate: PROFILE_SECONDS }).catch(() => null),
      fetchPolls(categories, 6).catch(() => []),
      articles ? discourseFetch(articlesPath(articles)).catch(() => null) : null,
      fetchEvents(categories).catch(() => []),
    ]);

    const latestTopics = mapList(latest, categoriesById);
    const activeTopics = mapList(active, categoriesById);
    const topTopics = mapList(top, categoriesById);
    const articleTopics = articleList ? newestFirst(mapList(articleList, categoriesById)) : [];
    const openPolls = polls.filter((p) => !p.closed);
    const stats = about?.about?.stats || {};

    const slide = (topic, fallbackDesc) =>
      topic && {
        title: topic.title,
        desc: topic.description || fallbackDesc(topic),
        image: topic.image,
        href: `/conversations/${topic.id}`,
      };
    const counts = (t) => `${t.replies} replies · ${t.views ?? 0} views in ${t.category}`;
    const poll = mostVoted(openPolls);

    return {
      // The top of the page: the newest article and the next event.
      hero: {
        article: articleTopics[0] && { title: articleTopics[0].title, desc: articleTopics[0].description, image: articleTopics[0].image, href: `/insights/${articleTopics[0].id}` },
        event: events[0] || null,
      },
      poll,
      trending: {
        trending: slide(topTopics[0], counts),
        mostactive: slide(activeTopics.find((t) => !t.pinned) || activeTopics[0], counts),
        latest: slide(latestTopics.find((t) => !t.pinned) || latestTopics[0], counts),
        insight: articleTopics[0] && { ...slide(articleTopics[0], counts), href: `/insights/${articleTopics[0].id}` },
        polls: poll && { title: poll.question, desc: `${poll.voters} ${poll.voters === 1 ? 'vote' : 'votes'} so far. Have your say.`, image: null, href: '/poll' },
      },
      // One recent topic from each of four categories.
      forum: latestTopics
        .filter((t) => !t.pinned && t.category)
        .filter((t, i, all) => all.findIndex((x) => x.category === t.category) === i)
        .slice(0, 4)
        .map((t) => ({ category: t.category, title: t.title, replies: t.replies, timeAgo: t.timeAgo, href: `/conversations/${t.id}` })),
      resources: articleTopics
        .slice(0, 6)
        .map((t) => ({ tag: t.category, title: t.title, image: t.image, href: `/insights/${t.id}` })),
      pulse: {
        contributors: stats.participating_users_30_days ?? null,
        topics: topTopics.length || null,
        members: stats.users_count ?? null,
        announcements: activeTopics.filter((t) => t.pinned).length,
      },
      updates: [...activeTopics.filter((t) => t.pinned), ...latestTopics.filter((t) => t.authorIsStaff && !t.pinned)]
        .filter((t, i, all) => all.findIndex((x) => x.id === t.id) === i)
        .slice(0, 4)
        .map((t) => ({ title: t.title, desc: t.description || `${t.timeAgo} in ${t.category}`, href: `/conversations/${t.id}` })),
    };
  });
}

// Insights are the topics in the forum's Articles category.
export function loadInsights() {
  return safely('insights', async () => {
    const categories = await loadCategories();
    const categoriesById = new Map(categories.map((c) => [c.id, c]));
    const articles = findCategory(categories, /article|insight/i);
    if (!articles) return null;

    const [list, latest, polls, members] = await Promise.all([
      discourseFetch(articlesPath(articles)),
      discourseFetch('/latest.json'),
      fetchPolls(categories, 6).catch(() => []),
      loadTopMembers(3).catch(() => []),
    ]);
    const items = newestFirst(mapList(list, categoriesById)).map((a) => ({ ...a, author: a.author.name, authorAvatar: a.author.avatar }));
    if (items.length === 0) return null;

    const poll = mostVoted(polls.filter((p) => !p.closed));
    return {
      featured: items.slice(0, 3),
      latest: items.slice(0, 6),
      recommended: [...items].sort((a, b) => b.views - a.views).slice(0, 4).map((a) => ({ id: a.id, title: a.title, readTime: `${a.views ?? 0} views` })),
      discussions: mapList(latest, categoriesById)
        .filter((t) => t.category !== articles.name)
        .slice(0, 4)
        .map((t) => ({ id: t.id, title: t.title, replies: t.replies, timeAgo: t.timeAgo })),
      poll: poll && {
        question: poll.question,
        topicId: poll.topicId,
        options: poll.options.map((o) => ({ label: o.label, percentage: parseInt(o.percentage, 10) })),
        responsesText: `${poll.voters} ${poll.voters === 1 ? 'response' : 'responses'} • ${poll.time}`,
      },
      experts: members.map((m, i) => ({ id: `m${i}`, name: m.name, contributions: m.contributions, avatar: m.avatar })),
    };
  });
}

// Other articles to show under an article.
export function loadRelatedArticles(excludeId) {
  return safely('related articles', async () => {
    const categories = await loadCategories();
    const articles = findCategory(categories, /article|insight/i);
    if (!articles) return [];
    const items = newestFirst(mapList(await discourseFetch(articlesPath(articles)), new Map()));
    return items.filter((a) => a.id !== Number(excludeId)).slice(0, 4).map((a) => ({ id: a.id, title: a.title, description: a.description, image: a.image }));
  });
}

// Events come from the Discourse Calendar and Event plugin. Without it the
// events endpoint is a 404, which fetch does not cache, so remember the miss
// for a while rather than asking on every page view.
const CALENDAR_RETRY_MS = 10 * 60 * 1000;
let calendarMissingAt = 0;

const EVENT_TIMEZONE = 'Asia/Kolkata';
const EVENT_IMAGE = '/images/eventbanner.png';

// A forum event in the shape the events components take (see sampleEvents.js).
function mapEvent(e, categoriesById) {
  const timeZone = e.timezone || EVENT_TIMEZONE;
  const start = new Date(e.starts_at);
  const end = e.ends_at ? new Date(e.ends_at) : null;
  const part = (options, date = start) => new Intl.DateTimeFormat('en-GB', { timeZone, ...options }).format(date);
  const clock = (date) => new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' }).format(date);
  const zone = part({ timeZoneName: 'short' }).split(' ').pop();
  const fullDate = `${part({ weekday: 'long' })}, ${part({ day: 'numeric' })} ${part({ month: 'long' })} ${part({ year: 'numeric' })}`;
  const upcoming = (end || start) > new Date();
  const topic = e.post?.topic;

  return {
    id: e.id,
    discourseEventId: e.id,
    topicId: topic?.id ?? null,
    startsAt: start.toISOString(),
    // An event without an end time is shown (and added to calendars) as one hour.
    endsAt: (end || new Date(start.getTime() + 60 * 60 * 1000)).toISOString(),
    upcoming,
    location: e.location || 'Virtual event',
    title: cleanTitle(e.name || topic?.title || 'Community event'),
    month: part({ month: 'long' }),
    day: part({ day: 'numeric' }),
    weekday: part({ weekday: 'short' }).toUpperCase(),
    time: `${clock(start)}${end ? ` - ${clock(end)}` : ''} ${zone}`,
    joining: e.stats?.going ?? 0,
    category: categoriesById.get(e.category_id)?.name || 'Event',
    image: EVENT_IMAGE,
    detailImage: EVENT_IMAGE,
    fullDate,
    speaker: null,
    agenda: null,
    registration: upcoming ? `Open until ${part({ day: 'numeric' })} ${part({ month: 'long' })}, ${clock(start)} ${zone}` : 'Closed',
    description: cleanExcerpt(e.description || ''),
  };
}

// Marks whether each event is still to come or has finished.
export const withUpcoming = (events, now = new Date()) => events.map((e) => ({ ...e, upcoming: new Date(e.endsAt || e.startsAt) > now }));

// Upcoming events soonest first, then past events most recent first.
export function orderEvents(events) {
  const time = (e) => new Date(e.startsAt).getTime();
  const upcoming = events.filter((e) => e.upcoming).sort((a, b) => time(a) - time(b));
  const past = events.filter((e) => !e.upcoming).sort((a, b) => time(b) - time(a));
  return [...upcoming, ...past];
}

async function fetchEvents(categories) {
  if (calendarMissingAt && Date.now() - calendarMissingAt < CALENDAR_RETRY_MS) return [];
  const data = await discourseFetch('/discourse-post-event/events.json?include_details=true').catch((error) => {
    if (error?.status === 404) {
      calendarMissingAt = Date.now();
      return null;
    }
    throw error;
  });
  calendarMissingAt = data ? 0 : calendarMissingAt;
  const categoriesById = new Map(categories.map((c) => [c.id, c]));
  return orderEvents((data?.events || []).filter((e) => e.starts_at).map((e) => mapEvent(e, categoriesById)));
}

// Forum events for the events page, or null to show the sample events.
export function loadEvents() {
  return safely('events', async () => {
    const events = await fetchEvents(await loadCategories());
    return events.length ? events : null;
  });
}
