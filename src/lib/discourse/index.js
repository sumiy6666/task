// Data access used by pages and route handlers. Talks to Discourse when it is
// configured and falls back to demo data otherwise.
import { actingUsername, discourseFetch, DiscourseError, isDiscourseConfigured } from './client';
import { mapCategory, mapPolls, mapTopic, mapUser } from './mappers';
import { mockCategories, mockCreateReply, mockCreateTopic, mockGetTopic, mockUser, mockVote } from './mock';

export { isDiscourseConfigured };

export async function getCurrentUser() {
  if (!isDiscourseConfigured()) return mockUser;
  const data = await discourseFetch(`/u/${encodeURIComponent(actingUsername())}.json`);
  return mapUser(data.user);
}

export async function getCategories() {
  if (!isDiscourseConfigured()) return mockCategories;
  const data = await discourseFetch('/categories.json');
  const categories = (data.category_list?.categories || []).map(mapCategory);
  // The design treats "Poll" as a category that switches the composer into poll
  // mode. If the forum has no such category, offer it anyway; the poll is then
  // posted without a category.
  if (!categories.some((c) => c.isPoll)) categories.push({ id: null, name: 'Poll', slug: 'poll', isPoll: true });
  return categories;
}

export async function getTopic(id) {
  if (!isDiscourseConfigured()) return mockGetTopic(id);
  const [topic, categories] = await Promise.all([discourseFetch(`/t/${encodeURIComponent(id)}.json`), getCategories()]);
  return mapTopic(topic, new Map(categories.map((c) => [c.id, c])));
}

export async function createTopic({ title, raw, categoryId }) {
  if (!isDiscourseConfigured()) return mockCreateTopic({ title, raw, categoryId });
  const body = { title, raw };
  if (categoryId) body.category = categoryId;
  const post = await discourseFetch('/posts.json', { method: 'POST', body });
  return { topicId: post.topic_id };
}

export async function createReply(topicId, { raw, replyToPostNumber }) {
  if (!isDiscourseConfigured()) return mockCreateReply(topicId, { raw, replyToPostNumber });
  const body = { topic_id: Number(topicId), raw };
  if (replyToPostNumber) body.reply_to_post_number = replyToPostNumber;
  const post = await discourseFetch('/posts.json', { method: 'POST', body });
  return { postId: post.id };
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
    throw new DiscourseError('Image uploads need a Discourse connection (DISCOURSE_URL and DISCOURSE_API_KEY).', 503);
  }
  const form = new FormData();
  form.append('type', 'composer');
  form.append('synchronous', 'true');
  form.append('file', file, file.name);
  const upload = await discourseFetch('/uploads.json', { method: 'POST', formData: form });
  const size = upload.width && upload.height ? `|${upload.width}x${upload.height}` : '';
  return { url: upload.url, markdown: `![${upload.original_filename}${size}](${upload.short_url || upload.url})` };
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
  if (!isDiscourseConfigured()) return mockVote(postId, pollName, optionIds);
  const data = await discourseFetch('/polls/vote.json', {
    method: 'PUT',
    body: { post_id: Number(postId), poll_name: pollName, options: optionIds },
  });
  const [poll] = mapPolls({ polls: [data.poll], polls_votes: { [pollName]: data.vote } });
  return poll;
}
