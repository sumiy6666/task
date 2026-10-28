import { errorResponse } from '@/lib/discourse/client';
import { requestSignup } from '@/lib/discourse/signup';
import { isCountry } from '@/lib/locations';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TITLES = ['Mr', 'Ms', 'Mrs', 'Dr', 'Prof'];
const TEXT_FIELDS = ['title', 'firstName', 'lastName', 'email', 'phone', 'company', 'designation', 'city', 'country', 'profileLink'];

// "https://", added when a member types "linkedin.com/in/…".
const withScheme = (link) => (link && !/^https?:\/\//i.test(link) ? `https://${link}` : link);
const isLinkedIn = (link) => {
  try {
    return /(^|\.)linkedin\.com$/i.test(new URL(link).hostname);
  } catch {
    return false;
  }
};
// "+91 98765 43210", "(020) 7946 0958": digits with the usual separators.
const isPhone = (phone) => /^\+?[\d\s().-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 7 && phone.replace(/\D/g, '').length <= 15;

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

    // Everything but the topics is required.
    const missing = [
      !TITLES.includes(form.title) && 'your title',
      !form.firstName && 'your first name',
      !form.lastName && 'your last name',
      !EMAIL.test(form.email) && 'a valid business email',
      !isPhone(form.phone) && 'a valid phone number',
      !form.company && 'your company',
      !form.designation && 'your designation',
      !form.city && 'your city',
      !isCountry(form.country) && 'your country',
      !isLinkedIn(form.profileLink) && 'your LinkedIn profile link',
    ].filter(Boolean);
    if (missing.length) return Response.json({ error: `Please enter ${missing.join(', ')}.` }, { status: 422 });

    return Response.json(
      await requestSignup({
        ...form,
        name: `${form.firstName} ${form.lastName}`,
        organisation: form.company,
        role: form.designation,
        location: `${form.city}, ${form.country}`,
      }),
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}
