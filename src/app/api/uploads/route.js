import { uploadImage } from '@/lib/discourse';
import { errorResponse } from '@/lib/discourse/client';

const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!file || typeof file === 'string') return Response.json({ error: 'No file received.' }, { status: 422 });
    if (!file.type.startsWith('image/')) return Response.json({ error: 'Only images can be attached.' }, { status: 422 });
    if (file.size > MAX_BYTES) return Response.json({ error: 'Images must be 10 MB or smaller.' }, { status: 413 });
    return Response.json(await uploadImage(file), { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
