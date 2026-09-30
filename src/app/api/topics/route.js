import { createTopic, POLL_TAG } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';
import { buildPollMarkup } from '@/lib/discourse/poll';

export async function POST(request) {
  try {
    const { type, title, body = '', categoryId = null, poll } = await request.json();
    const cleanTitle = String(title || '').trim();
    if (!cleanTitle) return Response.json({ error: 'Please add a title.' }, { status: 422 });

    let raw = String(body).trim();
    const tags = [];
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
      tags.push(POLL_TAG);
    } else if (!raw) {
      return Response.json({ error: 'Please write something before posting.' }, { status: 422 });
    }

    const result = await createTopic({ title: cleanTitle, raw, categoryId, tags });
    return Response.json(result, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
