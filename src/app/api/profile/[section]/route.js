import { getCurrentUser } from '@/lib/discourse';
import { errorResponse, isDiscourseConfigured, SIGN_IN_REQUIRED } from '@/lib/discourse/client';
import { loadBookmarks, loadDrafts, loadMessageThreads, loadNotifications, loadPeople, markNotificationsRead, startConversation } from '@/lib/discourse/profile';

// The member's own profile lists, loaded when their tab or filter is opened.
const SECTIONS = {
  notifications: () => loadNotifications(),
  messages: (user) => loadMessageThreads(user.username),
  bookmarks: (user) => loadBookmarks(user.username),
  drafts: () => loadDrafts(),
  people: (user) => loadPeople(user.username),
};

export async function GET(request, { params }) {
  try {
    const { section } = await params;
    const load = SECTIONS[section];
    if (!load) return Response.json({ error: 'Not found.' }, { status: 404 });
    if (!isDiscourseConfigured()) return Response.json({ items: null });
    const user = await getCurrentUser();
    if (!user) return Response.json({ error: SIGN_IN_REQUIRED }, { status: 401 });
    return Response.json({ items: await load(user) });
  } catch (error) {
    return errorResponse(error);
  }
}

// "Mark all as read" on the notifications tab.
export async function PUT(request, { params }) {
  try {
    const { section } = await params;
    if (section !== 'notifications') return Response.json({ error: 'Not found.' }, { status: 404 });
    if (!isDiscourseConfigured()) return Response.json({ ok: true });
    return Response.json(await markNotificationsRead());
  } catch (error) {
    return errorResponse(error);
  }
}

// A new conversation from Messages. Body: { to (username), text }.
export async function POST(request, { params }) {
  try {
    const { section } = await params;
    if (section !== 'messages') return Response.json({ error: 'Not found.' }, { status: 404 });
    const { to, text } = await request.json().catch(() => ({}));
    if (!/^[\w.-]{1,60}$/.test(String(to || ''))) return Response.json({ error: 'Choose who to message.' }, { status: 422 });
    if (!String(text || '').trim()) return Response.json({ error: 'Write a message first.' }, { status: 422 });
    if (!isDiscourseConfigured()) return Response.json({ id: null });
    const user = await getCurrentUser();
    if (!user) return Response.json({ error: SIGN_IN_REQUIRED }, { status: 401 });
    return Response.json(await startConversation(user, to, String(text).trim()), { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
