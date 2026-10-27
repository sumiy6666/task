// "Request to join": creates a forum account that waits for an admin. With the
// forum's `must_approve_users` setting on, Discourse holds the new account
// until staff approve it (Admin → Users → Pending) and emails the member when
// they are approved; they then sign in with the usual AV Community sign-in
// (see requestSignup for how they get in without having chosen a password).
import { randomBytes } from 'node:crypto';
import { DiscourseError, discourseFetch, isDiscourseConfigured } from './client';

// Organisation and role go to the forum's custom user fields when it has
// ones with matching names, and fill any other required sign-up field (this
// forum asks for "About You"); otherwise they go into the member's "About me".
const ORGANISATION_FIELD = /organi[sz]ation|company|firm|office/i;
const ROLE_FIELD = /role|title|designation|position/i;

async function userFields() {
  const site = await discourseFetch('/site.json').catch(() => null);
  return site?.user_fields || [];
}

// A free forum username from the name (or the email): "Priya Mehta" →
// "priya.mehta", or the forum's suggestion ("priya.mehta1") when it is taken.
async function freeUsername(name, email) {
  const clean = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s._-]/g, '').trim().replace(/\s+/g, '.').replace(/^[._-]+|[._-]+$/g, '');
  let base = clean(name).slice(0, 20);
  if (base.length < 3) base = clean(email.split('@')[0]).slice(0, 20);
  if (base.length < 3) base = `member.${randomBytes(3).toString('hex')}`;
  const check = await discourseFetch(`/u/check_username.json?username=${encodeURIComponent(base)}`, { revalidate: 0 }).catch(() => null);
  return check?.available === false && check.suggestion ? check.suggestion : base;
}

// The join form asks for no username or password: the forum gets a free
// username and a random password, and once approved the member signs in with
// an emailed login link or by setting a password ("Forgot password").
export async function requestSignup({ name, email, organisation, role, title, location, profileLink, topics = [] }) {
  if (!isDiscourseConfigured()) return { ok: true, demo: true };
  const username = await freeUsername(name, email);
  const password = randomBytes(24).toString('base64url');

  const fields = await userFields();
  const organisationField = fields.find((f) => ORGANISATION_FIELD.test(f.name));
  const roleField = fields.find((f) => ROLE_FIELD.test(f.name));
  const user_fields = {};
  if (organisationField) user_fields[organisationField.id] = organisation;
  if (roleField) user_fields[roleField.id] = role;
  const about = `${role} at ${organisation}`;
  for (const f of fields) if (f.required && !user_fields[f.id]) user_fields[f.id] = about;

  // Created with the site key (an admin) as already active, so Discourse
  // sends no "confirm your email" message: on this forum, which signs members
  // in through the AV Community login (DiscourseConnect), that link only
  // leads to a "page not found". The account stays pending until staff
  // approve it; Discourse then emails the member that they can log in.
  const result = await discourseFetch('/users.json', {
    method: 'POST',
    asSite: true,
    body: { name, email, username, password, user_fields, active: true, approved: false },
  });
  // Discourse answers 200 with `success: false` when a field is refused.
  if (!result?.success) {
    const errors = Object.values(result?.errors || {}).flat();
    throw new DiscourseError(errors[0] || result?.message || 'Could not create your account.', 422, errors);
  }

  // The rest of the request goes on the member's profile: Discourse has its
  // own location and website fields, and "About me" holds what is left.
  const bio = [
    title && `Title: ${title}`,
    !roleField && `Role: ${role}`,
    !organisationField && `Organisation: ${organisation}`,
    topics.length > 0 && `Topics of interest: ${topics.join(', ')}`,
  ].filter(Boolean);
  const profile = {
    ...(location && { location }),
    ...(profileLink && { website: profileLink }),
    ...(bio.length > 0 && { bio_raw: bio.join('\n') }),
  };
  if (Object.keys(profile).length) {
    await discourseFetch(`/u/${encodeURIComponent(username)}.json`, {
      method: 'PUT',
      asSite: true,
      body: profile,
    }).catch((error) => console.error('Could not save the new member’s profile details', error));
  }

  return { ok: true, active: Boolean(result.active), message: result.message || '' };
}
