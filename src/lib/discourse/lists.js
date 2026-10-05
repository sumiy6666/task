// Forum data for the list pages (Discussions, Polls), shaped like the props
// those pages' components already take. Each loader returns null when
// Discourse is not configured or fails, so the page keeps its sample data.
import { connection } from 'next/server';
import { avatarUrl, discourseFetch, isDiscourseConfigured } from './client';
import { compactNumber, timeAgo } from './format';
import { mapPolls } from './mappers';

const isAboutTopic = (t) => /^About the .+ category$/i.test(t.title);

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

function topicMapper(topicList, categoriesById) {
  const users = new Map((topicList.users || []).map((u) => [u.id, u]));
  return (t) => {
    const op = users.get(t.posters?.[0]?.user_id);
    return {
      id: t.id,
      title: t.title,
      author: { name: op?.name || op?.username || 'Member', avatar: avatarUrl(op?.avatar_template) },
      timeAgo: timeAgo(t.created_at),
      category: categoriesById.get(t.category_id)?.name || '',
      views: t.views ?? null,
      replies: Math.max(0, (t.posts_count || 1) - 1),
      likes: t.like_count || 0,
    };
  };
}

export function loadDiscussions() {
  return safely('discussions', async () => {
    const [categories, latest, active, top, directory, tags] = await Promise.all([
      loadCategories(),
      discourseFetch('/latest.json?order=created'),
      discourseFetch('/latest.json'),
      discourseFetch('/top.json?period=all'),
      discourseFetch('/directory_items.json?period=all&order=post_count').catch(() => null),
      discourseFetch('/tags.json').catch(() => null),
    ]);
    const categoriesById = new Map(categories.map((c) => [c.id, c]));
    const pick = (list, n) => (list.topic_list?.topics || []).filter((t) => !isAboutTopic(t)).slice(0, n).map(topicMapper(list, categoriesById));

    const recentlyActive = pick(active, 3).map((t) => ({ id: t.id, title: t.title, author: t.author.name, timeAgo: t.timeAgo, category: t.category }));
    const total = categories.reduce((sum, c) => sum + (c.topic_count || 0), 0);

    return {
      latest: pick(latest, 4),
      trending: pick(top, 4),
      recentlyActive,
      categories: [
        { name: 'All categories', count: compactNumber(total), isActive: true },
        ...categories.map((c) => ({ name: c.name, count: compactNumber(c.topic_count || 0), isActive: false })),
      ],
      members: (directory?.directory_items || []).slice(0, 6).map((item) => ({
        name: item.user?.name || item.user?.username,
        contributions: compactNumber(item.post_count || 0),
        avatar: avatarUrl(item.user?.avatar_template),
      })),
      tags: (tags?.tags || []).slice(0, 8).map((t) => ({ name: t.text || t.name || t.id, count: t.count || 0 })),
    };
  });
}

// Polls live in the forum's poll category (the one named "Poll"/"Polls").
export function loadPolls() {
  return safely('polls', async () => {
    const category = (await loadCategories()).find((c) => /poll/i.test(c.name));
    if (!category) return { open: [], closed: [] };

    const list = await discourseFetch(`/c/${encodeURIComponent(category.slug)}/${category.id}.json`);
    const topics = (list.topic_list?.topics || []).filter((t) => !isAboutTopic(t)).slice(0, 12);
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
        question: topic.title,
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

    return { open: polls.filter((p) => !p.closed), closed: polls.filter((p) => p.closed) };
  });
}
