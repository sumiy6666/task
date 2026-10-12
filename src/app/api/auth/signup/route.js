import { errorResponse } from '@/lib/discourse/client';
import { requestSignup } from '@/lib/discourse/signup';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME = /^[a-zA-Z0-9_.-]{3,20}$/;

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const form = Object.fromEntries(['name', 'email', 'username', 'password', 'organisation', 'role'].map((k) => [k, String(body[k] || '').trim()]));
    form.password = String(body.password || '');
    // A hidden field people never see; bots fill it in.
    if (String(body.website || '').trim()) return Response.json({ ok: true }, { status: 201 });

    const missing = [
      !form.name && 'your name',
      !EMAIL.test(form.email) && 'a valid work email',
      !USERNAME.test(form.username) && 'a username of 3–20 letters, numbers, dots, dashes or underscores',
      form.password.length < 10 && 'a password of at least 10 characters',
      !form.organisation && 'your organisation',
      !form.role && 'your role',
    ].filter(Boolean);
    if (missing.length) return Response.json({ error: `Please enter ${missing.join(', ')}.` }, { status: 422 });

    return Response.json(await requestSignup(form), { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
