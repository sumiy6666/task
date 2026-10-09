import { bookmarkPost, getTopic } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';

// Bookmarks a post; without `postId`, the topic's opening post (lists such as
// the discussions feed only know the topic).
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    let { postId } = await request.json().catch(() => ({}));
    if (!postId) postId = (await getTopic(id))?.firstPost?.id;
    if (!postId) return Response.json({ error: 'Missing post.' }, { status: 422 });
    return Response.json(await bookmarkPost(postId));
  } catch (error) {
    return errorResponse(error);
  }
}
