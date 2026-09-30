import { createReply } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const { raw, replyToPostNumber = null } = await request.json();
    if (!String(raw || '').trim()) return Response.json({ error: 'Reply cannot be empty.' }, { status: 422 });
    const result = await createReply(id, { raw: String(raw).trim(), replyToPostNumber });
    if (!result) return Response.json({ error: 'Conversation not found.' }, { status: 404 });
    return Response.json(result, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
