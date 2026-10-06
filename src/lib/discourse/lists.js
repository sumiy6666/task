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
      category: categoriesById.get(t.category_id)?.name || '',
      pinned: Boolean(t.pinned),
      views: t.views ?? null,
      replies: Math.max(0, (t.posts_count || 1) - 1),
      likes: t.like_count || 0,
    };
  };
}

// Site Feedback topics are notes to the team, so they stay out of the public lists.
const isFeedback = (t, categoriesById) => /feedback/i.test(categoriesById.get(t.category_id)?.name || '');
const mapList = (list, categoriesById) =>
  topicsOf(list).filter((t) => !isFeedback(t, categoriesById)).map(topicMapper(list, categoriesById));

// Members: the directory is closed to non-staff accounts on this forum, so
// fall back to the "all members" group and each member's profile summary.
async function loadMemberProfiles(limit) {
  const group = await discourseFetch(`/groups/trust_level_0/members.json?limit=${limit}&order=last_posted_at&asc=false`, { revalidate: 60 });
  const members = (group.members || []).filter((m) => m.id > 0);
  const profiles = await Promise.all(
    members.map(async (m) => {
      const name = encodeURIComponent(m.username);
      const [user, summary] = await Promise.all([
        discourseFetch(`/u/${name}.json`, { revalidate: 60 }).then((d) => d.user).catch(() => null),
        discourseFetch(`/u/${name}/summary.json`, { revalidate: 60 }).then((d) => d.user_summary).catch(() => null),
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
          contributions: summary?.post_count ?? 0,
          followers: summary?.likes_received ?? 0,
          followersLabel: 'LIKES\nRECEIVED',
        },
      };
    }),
  );
  return profiles.sort((a, b) => b.stats.contributions - a.stats.contributions);
}

async function loadTopMembers(limit) {
  // Prefer the directory when this account may read it; otherwise use profiles.
  const directory = await discourseFetch('/directory_items.json?period=all&order=post_count', { revalidate: 60 }).catch(() => null);
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
    const [categories, latest, active, top, members, tags] = await Promise.all([
      loadCategories(),
      discourseFetch('/latest.json?order=created'),
      discourseFetch('/latest.json'),
      discourseFetch('/top.json?period=all'),
      loadTopMembers(6).catch(() => []),
      discourseFetch('/tags.json').catch(() => null),
    ]);
    const categoriesById = new Map(categories.map((c) => [c.id, c]));

    const recentlyActive = mapList(active, categoriesById)
      .slice(0, 3)
      .map((t) => ({ id: t.id, title: t.title, author: t.author.name, timeAgo: t.timeAgo, category: t.category }));
    const total = categories.reduce((sum, c) => sum + (c.topic_count || 0), 0);

    return {
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

// Home page: the most-voted open poll, the trending carousel, the pulse
// numbers and the staff updates list.
export function loadHome() {
  return safely('home', async () => {
    const categories = await loadCategories();
    const categoriesById = new Map(categories.map((c) => [c.id, c]));
    const articles = findCategory(categories, /article|insight/i);
    const [latest, active, top, about, polls, articleList] = await Promise.all([
      discourseFetch('/latest.json?order=created'),
      discourseFetch('/latest.json'),
      discourseFetch('/top.json?period=all'),
      discourseFetch('/about.json', { revalidate: 60 }).catch(() => null),
      fetchPolls(categories, 6).catch(() => []),
      articles ? discourseFetch(categoryPath(articles)).catch(() => null) : null,
    ]);

    const latestTopics = mapList(latest, categoriesById);
    const activeTopics = mapList(active, categoriesById);
    const topTopics = mapList(top, categoriesById);
    const articleTopics = articleList ? mapList(articleList, categoriesById) : [];
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
      poll,
      trending: {
        trending: slide(topTopics[0], counts),
        mostactive: slide(activeTopics.find((t) => !t.pinned) || activeTopics[0], counts),
        latest: slide(latestTopics.find((t) => !t.pinned) || latestTopics[0], counts),
        insight: articleTopics[0] && { ...slide(articleTopics[0], counts), href: `/insights/${articleTopics[0].id}` },
        polls: poll && { title: poll.question, desc: `${poll.voters} ${poll.voters === 1 ? 'vote' : 'votes'} so far. Have your say.`, image: null, href: '/poll' },
      },
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
      discourseFetch(categoryPath(articles)),
      discourseFetch('/latest.json'),
      fetchPolls(categories, 6).catch(() => []),
      loadTopMembers(3).catch(() => []),
    ]);
    const items = mapList(list, categoriesById).map((a) => ({ ...a, author: a.author.name, authorAvatar: a.author.avatar }));
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
    const items = mapList(await discourseFetch(categoryPath(articles)), new Map());
    return items.filter((a) => a.id !== Number(excludeId)).slice(0, 4).map((a) => ({ id: a.id, title: a.title, description: a.description, image: a.image }));
  });
}
