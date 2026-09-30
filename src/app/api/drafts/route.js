import { saveDraft } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';

export async function POST(request) {
  try {
    const { data, sequence = 0 } = await request.json();
    return Response.json(await saveDraft({ data, sequence }));
  } catch (error) {
    return errorResponse(error);
  }
}
