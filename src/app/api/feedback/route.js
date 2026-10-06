import { createTopic, getCategories, isDiscourseConfigured, uploadImage } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';

const TYPES = {
  issue: 'Report an issue',
  feature: 'Feature suggestion',
  content: 'Content feedback',
  general: 'General feedback',
};
const MAX_BYTES = 5 * 1024 * 1024;
const FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

// Feedback becomes a topic in the forum's Site Feedback category, with the
// optional screenshot or PDF uploaded and linked in the post.
export async function POST(request) {
  try {
    const form = await request.formData();
    const type = TYPES[form.get('type')] || TYPES.general;
    const subject = String(form.get('subject') || '').trim();
    const details = String(form.get('details') || '').trim();
    const file = form.get('file');
    if (!subject) return Response.json({ error: 'Please add a short subject.' }, { status: 422 });
    if (!details) return Response.json({ error: 'Please tell us a little more.' }, { status: 422 });
    if (file && typeof file !== 'string') {
      if (!FILE_TYPES.includes(file.type)) return Response.json({ error: 'Please choose a JPG, PNG or PDF file.' }, { status: 422 });
      if (file.size > MAX_BYTES) return Response.json({ error: 'That file is larger than 5 MB.' }, { status: 413 });
    }

    // Without a forum connection there is nowhere to send it.
    if (!isDiscourseConfigured()) return Response.json({ ok: true }, { status: 201 });

    let attachment = '';
    if (file && typeof file !== 'string') {
      const upload = await uploadImage(file);
      attachment = file.type.startsWith('image/') ? upload.markdown : `[${file.name}|attachment](${upload.url})`;
    }

    const categories = await getCategories();
    const category = categories.find((c) => /feedback/i.test(c.name));
    const raw = [`**Type:** ${type}`, details, attachment].filter(Boolean).join('\n\n');
    const result = await createTopic({ title: `${type}: ${subject}`, raw, categoryId: category?.id ?? null });
    return Response.json(result, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
