import { bookmarkPost, getTopic, unbookmarkTopic } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';

// Bookmarks (or, with { remove: true }, un-bookmarks) a post; without
// `postId`, the topic's opening post (lists such as the discussions feed only
// know the topic).
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    let { postId, remove } = await request.json().catch(() => ({}));
    if (remove) return Response.json(await unbookmarkTopic(id, postId));
    if (!postId) postId = (await getTopic(id))?.firstPost?.id;
    if (!postId) return Response.json({ error: 'Missing post.' }, { status: 422 });
    return Response.json(await bookmarkPost(postId));
  } catch (error) {
    return errorResponse(error);
  }
}
