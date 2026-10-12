// "Request to join": creates a forum account that waits for an admin. With the
// forum's `must_approve_users` setting on, Discourse holds the new account
// until staff approve it (Admin → Users → Pending) and emails the member when
// they are approved; they then sign in with the usual AV Community sign-in.
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

export async function requestSignup({ name, email, username, password, organisation, role }) {
  if (!isDiscourseConfigured()) return { ok: true, demo: true };

  const fields = await userFields();
  const organisationField = fields.find((f) => ORGANISATION_FIELD.test(f.name));
  const roleField = fields.find((f) => ROLE_FIELD.test(f.name));
  const user_fields = {};
  if (organisationField) user_fields[organisationField.id] = organisation;
  if (roleField) user_fields[roleField.id] = role;
  const about = `${role} at ${organisation}`;
  for (const f of fields) if (f.required && !user_fields[f.id]) user_fields[f.id] = about;

  // Created with the site key, so no member is signed in; Discourse sends its
  // own "confirm your email" message and keeps the account pending approval.
  const result = await discourseFetch('/users.json', {
    method: 'POST',
    requireUser: false,
    body: { name, email, username, password, user_fields },
  });
  // Discourse answers 200 with `success: false` when a field is refused.
  if (!result?.success) {
    const errors = Object.values(result?.errors || {}).flat();
    throw new DiscourseError(errors[0] || result?.message || 'Could not create your account.', 422, errors);
  }

  if (!organisationField || !roleField) {
    await discourseFetch(`/u/${encodeURIComponent(username)}.json`, {
      method: 'PUT',
      requireUser: false,
      body: { bio_raw: `Role: ${role}\nOrganisation: ${organisation}` },
    }).catch((error) => console.error('Could not save the new member’s organisation and role', error));
  }

  return { ok: true, active: Boolean(result.active), message: result.message || '' };
}
