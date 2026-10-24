import { errorResponse } from '@/lib/discourse/client';
import { requestSignup } from '@/lib/discourse/signup';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEXT_FIELDS = ['title', 'firstName', 'lastName', 'email', 'company', 'designation', 'location', 'profileLink'];

// "https://", added when a member types "linkedin.com/in/…".
const withScheme = (link) => (link && !/^https?:\/\//i.test(link) ? `https://${link}` : link);
const isUrl = (link) => {
  try {
    return Boolean(new URL(link).hostname.includes('.'));
  } catch {
    return false;
  }
};

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const form = Object.fromEntries(TEXT_FIELDS.map((k) => [k, String(body[k] || '').trim().slice(0, 200)]));
    form.profileLink = withScheme(form.profileLink);
    form.topics = (Array.isArray(body.topics) ? body.topics : [])
      .map((t) => String(t).trim().slice(0, 60))
      .filter(Boolean)
      .slice(0, 10);
    // A hidden field people never see; bots fill it in.
    if (String(body.website || '').trim()) return Response.json({ ok: true }, { status: 201 });

    const missing = [
      !form.firstName && 'your first name',
      !form.lastName && 'your last name',
      !EMAIL.test(form.email) && 'a valid work email',
      !form.company && 'your company',
      !form.designation && 'your designation',
      form.profileLink && !isUrl(form.profileLink) && 'a valid website or LinkedIn link',
    ].filter(Boolean);
    if (missing.length) return Response.json({ error: `Please enter ${missing.join(', ')}.` }, { status: 422 });

    return Response.json(
      await requestSignup({
        ...form,
        name: `${form.firstName} ${form.lastName}`,
        organisation: form.company,
        role: form.designation,
      }),
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}
