import { createTopic, getCategories, getTagOptions } from '@/lib/discourse';
import { cleanTags } from '@/lib/discourse/tags';
import { categoriesFor, POST_KINDS } from '@/lib/discourse/post-kinds';
import { errorResponse } from '@/lib/discourse/client';
import { buildPollMarkup } from '@/lib/discourse/poll';

export async function POST(request) {
  try {
    const { type, kind: sentKind, title, body = '', categoryId: sentCategoryId = null, poll, tags: sentTags = [] } = await request.json();
    const cleanTitle = String(title || '').trim();
    if (!cleanTitle) return Response.json({ error: 'Please add a title.' }, { status: 422 });

    let raw = String(body).trim();
    if (type === 'poll') {
      const options = (poll?.options || []).map((o) => String(o).trim()).filter(Boolean);
      if (options.length < 2) return Response.json({ error: 'A poll needs at least two options.' }, { status: 422 });
      if (new Set(options.map((o) => o.toLowerCase())).size !== options.length) {
        return Response.json({ error: 'Poll options must be different from each other.' }, { status: 422 });
      }
      const markup = buildPollMarkup({
        options,
        allowMultiple: Boolean(poll.allowMultiple),
        anonymous: poll.anonymous !== false,
        closesAt: poll.closesAt || null,
      });
      raw = raw ? `${raw}\n\n${markup}` : markup;
    } else if (!raw) {
      return Response.json({ error: 'Please write something before posting.' }, { status: 422 });
    }

    // The type of post decides its category: an article always goes into
    // Articles, a poll into Polls, an insight into a discussion category. A
    // category outside that group is replaced by the group's first one.
    const kind = type === 'poll' ? 'poll' : POST_KINDS.includes(sentKind) ? sentKind : 'insight';
    const group = categoriesFor(kind, await getCategories());
    const chosen = group.find((c) => c.id != null && c.id === sentCategoryId) || group.find((c) => c.id != null);
    const categoryId = chosen ? chosen.id : sentCategoryId;

    // Optional tags, cleaned the way the forum stores them.
    const limits = Array.isArray(sentTags) && sentTags.length ? await getTagOptions() : null;
    const tags = limits ? cleanTags(sentTags, limits.max, limits.maxLength) : [];

    const result = await createTopic({ title: cleanTitle, raw, categoryId, tags });
    return Response.json(result, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
