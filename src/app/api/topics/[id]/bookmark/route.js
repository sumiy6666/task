import { bookmarkPost } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';

export async function POST(request) {
  try {
    const { postId } = await request.json();
    if (!postId) return Response.json({ error: 'Missing post.' }, { status: 422 });
    return Response.json(await bookmarkPost(postId));
  } catch (error) {
    return errorResponse(error);
  }
}
