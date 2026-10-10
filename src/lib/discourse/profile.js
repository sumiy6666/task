// My Profile from the forum. The profile, stats, activity and badges are
// public and read with the site key (cached); notifications, messages,
// bookmarks and drafts are the member's own and are only loaded when their
// tab is opened, to spare the member key's tight rate limit.
import { avatarUrl, discourseBaseUrl, discourseFetch, isDiscourseConfigured } from './client';
import { timeAgo } from './format';

const PROFILE_SECONDS = 300;
const MINE = { personal: true, requireUser: true };

const cleanTitle = (title = '') => title.replace(/\s*:[a-z0-9_+-]+:/gi, '').trim();
const plainText = (html = '') =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;/g, '’')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Avatar by username, for lists that only carry the name (notifications).
const avatarFor = (username) => {
  if (!username) return '/images/avatar-placeholder.svg';
  const host = new URL(discourseBaseUrl()).hostname;
  return avatarUrl(`/user_avatar/${host}/${encodeURIComponent(username.toLowerCase())}/{size}/1.png`);
};

const monthYear = (iso) => (iso ? new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : '');
const longDate = (iso) => (iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '');

function readTime(seconds = 0) {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)}h`;
  return `${Math.round(seconds / 86400)}d`;
}

// Picks one of the profile's line icons for a forum badge.
function badgeIcon(badge) {
  const name = `${badge.name} ${badge.description || ''}`.toLowerCase();
  if (/like|appreciat|helpful|love/.test(name)) return 'heart';
  if (/read|guideline|faq/.test(name)) return 'file';
  if (/visit|enthusiast|devotee|aficionado/.test(name)) return 'eye';
  if (/invit|welcome|member/.test(name)) return 'users';
  if (/reply|post|conversation|topic|discussion/.test(name)) return 'chat';
  if (/edit|wiki|bio|autobiographer|editor/.test(name)) return 'pencil';
  if (/link|share|resource/.test(name)) return 'bulb';
  if (/leader|regular|trust/.test(name)) return 'trophy';
  return 'star';
}

const ACTION = {
  1: { type: 'Likes', action: 'Liked a post' },
  4: { type: 'Topics', action: 'Started a new discussion' },
  5: { type: 'Replies', action: 'Replied to a discussion' },
};

// The public part of the profile, in the shapes the profile panels take.
// Returns null when Discourse is not connected or the member can't be read.
export async function loadProfile(username) {
  if (!isDiscourseConfigured() || !username) return null;
  const name = encodeURIComponent(username);
  const shared = { revalidate: PROFILE_SECONDS };
  const [userData, summaryData, actionsData, userBadges, allBadges] = await Promise.all([
    discourseFetch(`/u/${name}.json`, shared),
    discourseFetch(`/u/${name}/summary.json`, shared).catch(() => null),
    discourseFetch(`/user_actions.json?username=${name}&filter=1,4,5`, shared).catch(() => null),
    discourseFetch(`/user-badges/${name}.json`, shared).catch(() => null),
    discourseFetch('/badges.json', shared).catch(() => null),
  ]);
  const user = userData.user;
  const s = summaryData?.user_summary || {};

  const badgesById = new Map([...(userBadges?.badges || []), ...(allBadges?.badges || [])].map((b) => [b.id, b]));
  const earned = [];
  for (const ub of userBadges?.user_badges || []) {
    const badge = badgesById.get(ub.badge_id);
    if (!badge || earned.some((b) => b.id === badge.id)) continue;
    earned.push({ id: badge.id, icon: badgeIcon(badge), name: badge.name, text: plainText(badge.description), earned: longDate(ub.granted_at) });
  }
  const earnedIds = new Set(earned.map((b) => b.id));
  const upcoming = (allBadges?.badges || [])
    .filter((b) => b.enabled !== false && !earnedIds.has(b.id))
    .slice(0, 6)
    .map((b) => ({ id: b.id, icon: badgeIcon(b), name: b.name, text: plainText(b.description) }));

  const activity = (actionsData?.user_actions || []).map((a) => ({
    id: `${a.action_type}-${a.post_id || a.topic_id}`,
    type: ACTION[a.action_type]?.type || 'Topics',
    author: { name: a.name || a.username, avatar: avatarUrl(a.avatar_template) },
    timeAgo: timeAgo(a.created_at),
    action: ACTION[a.action_type]?.action || 'Posted',
    title: cleanTitle(a.title),
    text: plainText(a.excerpt),
    href: `/conversations/${a.topic_id}`,
  }));

  return {
    profile: {
      name: user.name || user.username,
      username: user.username,
      avatar: avatarUrl(user.avatar_template, 240),
      bio: plainText(user.bio_cooked || user.bio_excerpt || ''),
      location: user.location || '',
      memberSince: monthYear(user.created_at),
      role: user.title || (user.admin ? 'Admin' : user.moderator ? 'Moderator' : 'Member'),
      editHref: `${discourseBaseUrl()}/u/${name}/preferences/account`,
    },
    glance: [
      { icon: 'eye', value: String(s.days_visited ?? 0), label: 'Days Visited' },
      { icon: 'clock', value: readTime(s.time_read ?? 0), label: 'Read Time' },
      { icon: 'chat', value: String(s.posts_read_count ?? 0), label: 'Posts read' },
      { icon: 'heart', value: String(s.likes_given ?? 0), label: 'Given' },
      { icon: 'heart', value: String(s.likes_received ?? 0), label: 'Received' },
      { icon: 'users', value: String(s.topic_count ?? 0), label: 'Topics created' },
      { icon: 'pencil', value: String(s.post_count ?? 0), label: 'Posts created' },
    ],
    activity,
    badges: { earned, upcoming },
  };
}

const KIND = { 1: 'Mention', 3: 'Mention', 15: 'Mention', 2: 'Replies', 6: 'Replies', 9: 'Replies' };

function notificationTitle(n, who) {
  switch (n.notification_type) {
    case 1:
    case 15: return `${who} mentioned you`;
    case 2: return `${who} replied to you`;
    case 3: return `${who} quoted you`;
    case 5:
    case 19: return `${who} liked your post`;
    case 6:
    case 7: return `${who} sent you a message`;
    case 9: return `${who} posted in a discussion you follow`;
    case 12: return 'You earned a new badge';
    case 17: return 'New discussion';
    case 20: return 'Your post was approved';
    default: return who ? `Update from ${who}` : 'Community update';
  }
}

function dayGroup(iso) {
  const day = (d) => new Date(d).toDateString();
  if (day(iso) === day(Date.now())) return 'Today';
  if (day(iso) === day(Date.now() - 86400000)) return 'Yesterday';
  return 'Earlier';
}

export async function loadNotifications() {
  const data = await discourseFetch('/notifications.json?limit=30', MINE);
  return (data.notifications || []).map((n) => {
    const d = n.data || {};
    const who = d.display_username || d.original_username || d.username || '';
    const subject = n.notification_type === 12 ? d.badge_name : cleanTitle(d.topic_title || n.fancy_title || '');
    return {
      id: n.id,
      group: dayGroup(n.created_at),
      kind: KIND[n.notification_type] || 'Updates',
      avatar: avatarFor(who || d.username),
      title: notificationTitle(n, who),
      lines: subject ? [subject] : [],
      time: timeAgo(n.created_at),
      unread: !n.read,
      href: n.topic_id ? `/conversations/${n.topic_id}` : null,
    };
  });
}

export async function markNotificationsRead() {
  await discourseFetch('/notifications/mark-read.json', { method: 'PUT' });
  return { ok: true };
}

// The member's private message threads, newest first. Messages are loaded
// per thread when it is opened.
export async function loadMessageThreads(username) {
  const data = await discourseFetch(`/topics/private-messages/${encodeURIComponent(username)}.json`, MINE);
  const users = new Map((data.users || []).map((u) => [u.id, u]));
  return (data.topic_list?.topics || []).map((t) => {
    const others = [...(t.participants || []), ...(t.posters || [])]
      .map((p) => users.get(p.user_id))
      .filter((u) => u && u.username !== username);
    const other = others[0] || users.get(t.posters?.[0]?.user_id);
    return {
      id: t.id,
      name: other ? other.name || other.username : 'AV Community',
      avatar: avatarUrl(other?.avatar_template),
      preview: cleanTitle(t.title),
      time: timeAgo(t.last_posted_at || t.created_at),
      unread: (t.unread_posts || 0) + (t.new_posts || 0) > 0 || t.unseen === true,
      messages: null,
    };
  });
}

export async function loadMessageThread(topicId, username) {
  const data = await discourseFetch(`/t/${Number(topicId)}.json`, MINE);
  if (data.archetype !== 'private_message') return [];
  return (data.post_stream?.posts || [])
    .filter((p) => p.post_type === 1)
    .map((p) => ({
      from: p.username === username ? 'me' : 'them',
      text: plainText(p.cooked),
      time: new Date(p.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    }));
}

// Bookmarks and drafts for the Activity tab's filters.
export async function loadBookmarks(username) {
  const data = await discourseFetch(`/u/${encodeURIComponent(username)}/bookmarks.json`, MINE).catch((error) => {
    // A member with no bookmarks gets a 404 rather than an empty list.
    if (error?.status === 404) return null;
    throw error;
  });
  return (data?.user_bookmark_list?.bookmarks || []).map((b) => ({
    id: `bookmark-${b.id}`,
    type: 'Bookmarks',
    author: { name: b.user?.name || b.user?.username || b.username || 'Member', avatar: avatarUrl(b.user?.avatar_template || b.avatar_template) },
    timeAgo: timeAgo(b.created_at),
    action: 'Bookmarked a post',
    title: cleanTitle(b.title || b.fancy_title || ''),
    text: plainText(b.excerpt || ''),
    href: b.topic_id ? `/conversations/${b.topic_id}` : '/discussions',
  }));
}

export async function loadDrafts() {
  const data = await discourseFetch('/drafts.json', MINE);
  return (data.drafts || []).map((d) => {
    let draft = {};
    try {
      draft = typeof d.data === 'string' ? JSON.parse(d.data) : d.data || {};
    } catch {}
    return {
      id: `draft-${d.draft_key}`,
      type: 'Drafts',
      author: { name: d.name || d.username || 'You', avatar: avatarUrl(d.avatar_template) },
      timeAgo: timeAgo(d.created_at),
      action: d.topic_id ? 'Draft reply' : 'Draft discussion',
      title: cleanTitle(d.title || draft.title || 'Untitled draft'),
      text: plainText(d.excerpt || draft.reply || ''),
      href: d.topic_id ? `/conversations/${d.topic_id}` : '/conversations/new',
    };
  });
}
