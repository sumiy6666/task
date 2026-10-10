import { getCurrentUser } from '@/lib/discourse';
import { errorResponse, SIGN_IN_REQUIRED } from '@/lib/discourse/client';
import { loadMessageThread } from '@/lib/discourse/profile';

// The messages in one private conversation.
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!/^\d+$/.test(id)) return Response.json({ error: 'Not found.' }, { status: 404 });
    const user = await getCurrentUser();
    if (!user) return Response.json({ error: SIGN_IN_REQUIRED }, { status: 401 });
    return Response.json({ messages: await loadMessageThread(id, user.username) });
  } catch (error) {
    return errorResponse(error);
  }
}
