import { getCurrentUser } from '@/lib/discourse';
import { errorResponse, SIGN_IN_REQUIRED } from '@/lib/discourse/client';
import { approveMember, declineMember } from '@/lib/discourse/approvals';

// Approve or decline one join request (staff only). Body: { action }.
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    if (!/^\d+$/.test(id)) return Response.json({ error: 'Not found.' }, { status: 404 });
    const user = await getCurrentUser();
    if (!user) return Response.json({ error: SIGN_IN_REQUIRED }, { status: 401 });
    if (!user.staff) return Response.json({ error: 'Only admins and moderators can approve members.' }, { status: 403 });
    const { action } = await request.json().catch(() => ({}));
    if (action === 'approve') return Response.json(await approveMember(id));
    if (action === 'decline') return Response.json(await declineMember(id));
    return Response.json({ error: 'Choose approve or decline.' }, { status: 422 });
  } catch (error) {
    return errorResponse(error);
  }
}
