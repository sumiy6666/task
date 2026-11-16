// Topic tags, as on the forum: lowercase words joined by dashes, a few per post.
export const MAX_TAGS = 5;
export const MAX_TAG_LENGTH = 20;

// "Family Office!" → "family-office". Letters (any script), digits, - and _.
export function cleanTag(text, maxLength = MAX_TAG_LENGTH) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/^#+/, '')
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}_-]/gu, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLength);
}

// A list of tags from a request: cleaned, without repeats, at most `max`.
export function cleanTags(list, max = MAX_TAGS, maxLength = MAX_TAG_LENGTH) {
  const seen = new Set();
  for (const t of Array.isArray(list) ? list : []) {
    const tag = cleanTag(t, maxLength);
    if (tag) seen.add(tag);
    if (seen.size >= max) break;
  }
  return [...seen];
}
