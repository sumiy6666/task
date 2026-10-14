// The site key's account is an admin, so whatever it reads includes staff-only
// categories and other people's private messages. Anything read with it for a
// visitor goes through these checks first.
import { discourseFetch } from './client';

// Ids of the categories only some members can read (from the full, flat
// category list, so subcategories are covered too).
export async function restrictedCategoryIds() {
  const site = await discourseFetch('/site.json').catch(() => null);
  return new Set((site?.categories || []).filter((c) => c.read_restricted).map((c) => c.id));
}

// Whether a topic (from /t/{id}.json or a topic list) is open to everyone.
export const isPublicTopic = (topic, restricted) =>
  topic?.archetype !== 'private_message' && !restricted.has(topic?.category_id);
