import { avatarUrl } from './client';

export { compactNumber, timeAgo } from './format';

export function mapUser(user) {
  return {
    username: user.username,
    name: user.name || user.username,
    avatar: avatarUrl(user.avatar_template),
  };
}

export function mapCategory(category) {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    isPoll: /poll/i.test(category.name),
  };
}

const stripTags = (html) => String(html || '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

export function mapPolls(post) {
  return (post.polls || []).map((poll) => ({
    name: poll.name,
    type: poll.type,
    status: poll.status,
    closesAt: poll.close || null,
    isPublic: Boolean(poll.public),
    voters: poll.voters || 0,
    options: (poll.options || []).map((o) => ({ id: o.id, text: stripTags(o.html), votes: o.votes || 0 })),
    userVotes: post.polls_votes?.[poll.name] || [],
  }));
}

function mapPost(post) {
  return {
    id: post.id,
    postNumber: post.post_number,
    replyToPostNumber: post.reply_to_post_number,
    author: {
      username: post.username,
      name: post.name || post.username,
      avatar: avatarUrl(post.avatar_template),
    },
    html: post.cooked,
    createdAt: post.created_at,
    bookmarked: Boolean(post.bookmarked),
    liked: Boolean(post.actions_summary?.find((a) => a.id === 2)?.acted),
    polls: mapPolls(post),
  };
}

// Discourse returns a flat post stream. The design shows one level of nesting:
// a reply to another reply is drawn indented under that reply.
function threadReplies(posts) {
  const top = [];
  const rootOf = new Map(); // post number -> top-level reply it belongs under
  for (const post of posts) {
    const node = { ...post, children: [] };
    const root = post.replyToPostNumber && post.replyToPostNumber !== 1 ? rootOf.get(post.replyToPostNumber) : null;
    if (root) root.children.push(node);
    else top.push(node);
    rootOf.set(post.postNumber, root || node);
  }
  return top;
}

export function mapTopic(topic, categoriesById = new Map()) {
  const posts = (topic.post_stream?.posts || []).map(mapPost);
  const [first, ...rest] = posts;
  const tags = (topic.tags || []).map((t) => (typeof t === 'string' ? t : t.name));

  return {
    id: topic.id,
    title: topic.title,
    categoryName: categoriesById.get(topic.category_id)?.name || '',
    tags,
    firstPost: first || null,
    replies: threadReplies(rest),
    replyCount: Math.max(0, (topic.posts_count || 1) - 1),
    likeCount: topic.like_count || 0,
    views: topic.views || 0,
    lastActivityAt: topic.last_posted_at || topic.bumped_at || topic.created_at,
    related: (topic.suggested_topics || topic.related_topics || []).slice(0, 3).map((t) => {
      const poster = t.posters?.[0]?.user;
      return {
        id: t.id,
        title: t.fancy_title || t.title,
        avatar: poster ? avatarUrl(poster.avatar_template) : '/images/avatar-placeholder.svg',
      };
    }),
  };
}
