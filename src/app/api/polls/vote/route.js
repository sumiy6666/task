import { votePoll } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';

export async function POST(request) {
  try {
    const { postId, pollName = 'poll', optionIds } = await request.json();
    if (!postId || !Array.isArray(optionIds) || optionIds.length === 0) {
      return Response.json({ error: 'Choose an option to vote.' }, { status: 422 });
    }
    const poll = await votePoll({ postId, pollName, optionIds: optionIds.map(String) });
    if (!poll) return Response.json({ error: 'Poll not found.' }, { status: 404 });
    return Response.json({ poll });
  } catch (error) {
    return errorResponse(error);
  }
}
