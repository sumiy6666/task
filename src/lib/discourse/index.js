// Data access used by pages and route handlers. Talks to Discourse when it is
// configured and falls back to demo data otherwise.
import { cache } from 'react';
import { absoluteUrl, actingUsername, discourseFetch, DiscourseError, hasAdminKey, isDiscourseConfigured, isSignInEnabled } from './client';
import { getUserAuth } from './session';
import { mapCategory, mapPolls, mapTopic, mapUser } from './mappers';
import { isPublicTopic, restrictedCategoryIds } from './privacy';
import { loadDemo, recordDemoOp } from './demo-session';
import { mockCategories, mockGetTopic, mockUser, nextTopicId } from './mock';
import { countryOf, flagUrl } from '../locations';
import { loadMessageThreads } from './profile';

export { isDiscourseConfigured, isSignInEnabled };

// The signed-in member, or null for a guest. Cached per request because the
// layout and the page both ask.
export const getCurrentUser = cache(async () => {
  if (!isDiscourseConfigured()) return mockUser;
  if (isSignInEnabled() && (await getUserAuth())) {
    try {
      const data = await discourseFetch('/session/current.json', { personal: true });
      return data?.current_user ? withCountry(mapUser(data.current_user)) : null;
    } catch (error) {
      if (error instanceof DiscourseError && [401, 403, 404].includes(error.status)) return null;
      throw error;
    }
  }
  // With sign-in off, everyone acts as the site's API user.
  if (!isSignInEnabled() && hasAdminKey()) {
    const data = await discourseFetch(`/u/${encodeURIComponent(actingUsername())}.json`);
    return withUnreadChats(await withCountry(mapUser(data.user), data.user.location));
  }
  return null;
});

// The header's message dot counts unread conversations with other members.
// The forum's own count also includes its notices ("users waiting for
// approval", welcome messages), which are not chats, so when it says there is
// something unread the conversations themselves are checked.
async function withUnreadChats(user) {
  if (!user.unreadMessages) return user;
  const threads = await loadMessageThreads(user.username).catch(() => null);
  return { ...user, unreadMessages: threads ? threads.filter((t) => t.unread).length : 0 };
}

// The member's country, from the location on their profile, with its flag
// for the header avatar. The session doesn't carry the location, so it is
// read from the profile (cached, as profiles change slowly).
async function withCountry(user, location) {
  if (location === undefined) {
    const data = await discourseFetch(`/u/${encodeURIComponent(user.username)}.json`, { revalidate: 300 }).catch(() => null);
    location = data?.user?.location;
  }
  const country = countryOf(location);
  return country ? { ...user, country: country.name, flag: flagUrl(country.code) } : user;
}

export async function getCategories() {
  if (!isDiscourseConfigured()) return mockCategories;
  const data = await discourseFetch('/categories.json');
  // Staff-only and "Uncategorized" are not offered to members in the composer.
  const categories = (data.category_list?.categories || [])
    .filter((c) => !c.read_restricted && c.slug !== 'uncategorized')
    .map(mapCategory);
  // The design treats "Poll" as a category that switches the composer into poll
  // mode. If the forum has no such category, offer it anyway; the poll is then
  // posted without a category.
  if (!categories.some((c) => c.isPoll)) categories.push({ id: null, name: 'Poll', slug: 'poll', isPoll: true });
  return categories;
}

// `track` counts the visit as a view of the topic: the forum only counts a
// view when a member asks for it (all requests come from this server, so
// guests' visits can't be told apart).
export async function getTopic(id, { track = false } = {}) {
  if (!isDiscourseConfigured()) return mockGetTopic((await loadDemo()).store, id);
  // Read as the member, so their own votes, likes and bookmark show. A guest's
  // read uses the site key (an admin), so it is only shown when the topic is
  // public: never another member's private message or a staff-only topic.
  const member = isSignInEnabled() ? await getUserAuth() : null;
  const [topic, categories, restricted] = await Promise.all([
    discourseFetch(`/t/${encodeURIComponent(id)}.json${track && member ? '?track_visit=true' : ''}`, {
      personal: true,
      headers: track && member ? { 'Discourse-Track-View': 'true', 'Discourse-Track-View-Topic-Id': String(Number(id)) } : undefined,
    }),
    getCategories(),
    member ? null : restrictedCategoryIds(),
  ]);
  if (restricted && !isPublicTopic(topic, restricted)) throw new DiscourseError('Not found.', 404);
  // A deleted (or author-withdrawn) topic is gone, even though an admin key can still read it.
  const opening = topic.post_stream?.posts?.find((p) => p.post_number === 1);
  if (topic.deleted_at || opening?.deleted_at || opening?.user_deleted) throw new DiscourseError('Not found.', 404);
  return mapTopic(topic, new Map(categories.map((c) => [c.id, c])));
}

export async function createTopic({ title, raw, categoryId, tags = [] }) {
  if (!isDiscourseConfigured()) {
    const demo = await loadDemo();
    const op = { t: 'topic', id: nextTopicId(demo.store), title, raw, categoryId, tags, at: new Date().toISOString() };
    return recordDemoOp(demo, op);
  }
  const body = { title, raw };
  if (categoryId) body.category = categoryId;
  if (tags.length) body.tags = tags;
  const post = await discourseFetch('/posts.json', { method: 'POST', body });
  // Posts from new members may wait for a moderator ("enqueued"): no topic yet.
  return post?.topic_id ? { topicId: post.topic_id } : { pending: true };
}

export async function createReply(topicId, { raw, replyToPostNumber }) {
  if (!isDiscourseConfigured()) {
    const op = { t: 'reply', topicId: Number(topicId), raw, replyToPostNumber, at: new Date().toISOString() };
    return recordDemoOp(await loadDemo(), op);
  }
  const body = { topic_id: Number(topicId), raw };
  if (replyToPostNumber) body.reply_to_post_number = replyToPostNumber;
  const post = await discourseFetch('/posts.json', { method: 'POST', body });
  return post?.id ? { postId: post.id } : { pending: true };
}

export async function saveDraft({ data, sequence = 0 }) {
  if (!isDiscourseConfigured()) return { sequence: sequence + 1 };
  const result = await discourseFetch('/drafts.json', {
    method: 'POST',
    body: { draft_key: 'new_topic', data: JSON.stringify(data), sequence },
  });
  return { sequence: result?.draft_sequence ?? sequence + 1 };
}

export async function bookmarkPost(postId) {
  if (!isDiscourseConfigured()) return { ok: true };
  await discourseFetch('/bookmarks.json', {
    method: 'POST',
    body: { bookmarkable_id: Number(postId), bookmarkable_type: 'Post' },
  });
  return { ok: true };
}

export async function uploadImage(file) {
  if (!isDiscourseConfigured()) {
    throw new DiscourseError('Image uploads need a Discourse connection (DISCOURSE_URL).', 503);
  }
  const form = new FormData();
  form.append('type', 'composer');
  form.append('synchronous', 'true');
  form.append('file', file, file.name);
  const upload = await discourseFetch('/uploads.json', { method: 'POST', formData: form });
  const size = upload.width && upload.height ? `|${upload.width}x${upload.height}` : '';
  // `url` is for the composer's preview; the post itself uses the forum's
  // short upload link.
  return { url: absoluteUrl(upload.url), name: upload.original_filename, markdown: `![${upload.original_filename}${size}](${upload.short_url || upload.url})` };
}

// Events come from the Discourse Calendar plugin (discourse-post-event).
// An event is identified by the id of the post that holds it.
export async function registerForEvent(eventId) {
  if (!isDiscourseConfigured()) return { ok: true };
  await discourseFetch(`/discourse-post-event/events/${encodeURIComponent(eventId)}/invitees.json`, {
    method: 'POST',
    body: { invitee: { status: 'going' } },
  });
  return { ok: true };
}

export async function votePoll({ postId, pollName, optionIds }) {
  if (!isDiscourseConfigured()) return recordDemoOp(await loadDemo(), { t: 'vote', postId: Number(postId), pollName, optionIds });
  const data = await discourseFetch('/polls/vote.json', {
    method: 'PUT',
    body: { post_id: Number(postId), poll_name: pollName, options: optionIds },
  });
  const [poll] = mapPolls({ polls: [data.poll], polls_votes: { [pollName]: data.vote } });
  return poll;
}

// Like is post action type 2.
export async function setPostLiked(postId, liked) {
  if (!isDiscourseConfigured()) return { liked };
  if (liked) {
    await discourseFetch('/post_actions.json', { method: 'POST', body: { id: Number(postId), post_action_type_id: 2 } });
  } else {
    await discourseFetch(`/post_actions/${encodeURIComponent(postId)}.json?post_action_type_id=2`, { method: 'DELETE' });
  }
  return { liked };
}
