import { getCurrentUser } from '@/lib/discourse';
import { errorResponse, isDiscourseConfigured, SIGN_IN_REQUIRED } from '@/lib/discourse/client';
import { loadBookmarks, loadDrafts, loadMessageThreads, loadNotifications, markNotificationsRead } from '@/lib/discourse/profile';

// The member's own profile lists, loaded when their tab or filter is opened.
const SECTIONS = {
  notifications: () => loadNotifications(),
  messages: (user) => loadMessageThreads(user.username),
  bookmarks: (user) => loadBookmarks(user.username),
  drafts: () => loadDrafts(),
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
