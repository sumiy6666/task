import { getTopic, setPostLiked } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';

// Likes (or unlikes) a topic's opening post; lists such as the discussions
// feed only know the topic.
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const { liked } = await request.json().catch(() => ({}));
    const postId = (await getTopic(id))?.firstPost?.id;
    if (!postId) return Response.json({ error: 'Conversation not found.' }, { status: 404 });
    return Response.json(await setPostLiked(postId, Boolean(liked)));
  } catch (error) {
    return errorResponse(error);
  }
}
