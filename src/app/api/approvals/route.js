import { getCurrentUser } from '@/lib/discourse';
import { errorResponse, SIGN_IN_REQUIRED } from '@/lib/discourse/client';
import { loadPendingMembers } from '@/lib/discourse/approvals';

// Join requests waiting for approval (staff only).
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return Response.json({ error: SIGN_IN_REQUIRED }, { status: 401 });
    if (!user.staff) return Response.json({ error: 'Only admins and moderators can approve members.' }, { status: 403 });
    return Response.json({ items: await loadPendingMembers() });
  } catch (error) {
    return errorResponse(error);
  }
}
