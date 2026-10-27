// Join requests waiting for staff. With `must_approve_users` on, a request
// from the Join page is a forum account that can't be used until an admin or
// moderator approves it; Discourse then emails the member their login link.
// These calls use the site key (an admin): the routes check that the
// signed-in member is staff first.
import { avatarUrl, discourseFetch } from './client';
import { timeAgo } from './format';

const ADMIN = { asSite: true, revalidate: 0 };

export async function loadPendingMembers() {
  const [pending, site] = await Promise.all([
    discourseFetch('/admin/users/list/pending.json?show_emails=true', ADMIN),
    discourseFetch('/site.json').catch(() => null),
  ]);
  const fieldNames = new Map((site?.user_fields || []).map((f) => [String(f.id), f.name]));
  return Promise.all(
    (pending || []).map(async (u) => {
      // The profile holds what the Join form asked for (company, role, topics…).
      const profile = await discourseFetch(`/u/${encodeURIComponent(u.username)}.json`, ADMIN)
        .then((d) => d.user)
        .catch(() => null);
      const fields = Object.entries(profile?.user_fields || {})
        .filter(([, value]) => typeof value === 'string' && value.trim())
        .map(([id, value]) => ({ label: fieldNames.get(id) || 'Details', value }));
      return {
        id: u.id,
        name: u.name || profile?.name || u.username,
        username: u.username,
        email: u.email || profile?.email || '',
        avatar: avatarUrl(u.avatar_template),
        requested: timeAgo(u.created_at),
        location: profile?.location || '',
        website: profile?.website || '',
        about: (profile?.bio_raw || '').trim(),
        fields,
      };
    }),
  );
}

// Approving also emails the member a "set your password" link: join requests
// are created with a random password, so that is how they choose their own.
// This works when the forum uses its own accounts; while it signs members in
// through an outside login (DiscourseConnect) the forum refuses password
// emails, and only its "you've been approved" email goes out.
export async function approveMember(id) {
  await discourseFetch(`/admin/users/${Number(id)}/approve.json`, { method: 'PUT', asSite: true });
  const user = await discourseFetch(`/admin/users/${Number(id)}.json`, ADMIN).catch(() => null);
  const login = user?.email || user?.username;
  const passwordEmail = login
    ? await discourseFetch('/session/forgot_password.json', { method: 'POST', asSite: true, body: { login } })
        .then(() => true)
        .catch((error) => {
          console.error('Could not send the approved member a set-password email', error);
          return false;
        })
    : false;
  return { ok: true, passwordEmail };
}

// A declined request removes the waiting account, so the same email can ask
// again later.
export async function declineMember(id) {
  await discourseFetch(`/admin/users/${Number(id)}.json`, { method: 'DELETE', asSite: true, body: { context: 'Join request declined' } });
  return { ok: true };
}

// Whether a notification or message is Discourse's "users waiting for
// approval" notice to staff.
export const isApprovalNotice = (title = '') => /waiting for approval/i.test(title);
