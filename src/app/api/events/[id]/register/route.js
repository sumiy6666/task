import { registerForEvent } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const { name, email, organisation, role, discourseEventId } = await request.json();
    const missing = [
      !String(name || '').trim() && 'name',
      !EMAIL.test(String(email || '').trim()) && 'a valid email address',
      !String(organisation || '').trim() && 'organisation',
      !String(role || '').trim() && 'role',
    ].filter(Boolean);
    if (missing.length) return Response.json({ error: `Please enter ${missing.join(', ')}.` }, { status: 422 });

    // Events that are not backed by a Discourse calendar post yet have nothing
    // to RSVP to, so the registration is only validated.
    if (discourseEventId) await registerForEvent(discourseEventId);
    return Response.json({ ok: true, email: String(email).trim() }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
