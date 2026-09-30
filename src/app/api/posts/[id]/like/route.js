import { setPostLiked } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const { liked } = await request.json();
    return Response.json(await setPostLiked(id, Boolean(liked)));
  } catch (error) {
    return errorResponse(error);
  }
}
