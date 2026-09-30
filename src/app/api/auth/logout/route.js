import { NextResponse } from 'next/server';
import { discourseFetch } from '@/lib/discourse/client';
import { CLIENT_COOKIE, KEY_COOKIE, safeReturnPath } from '@/lib/discourse/session';

// Revokes the member's key on Discourse and forgets it here.
export async function POST(request) {
  if (request.cookies.get(KEY_COOKIE)) {
    try {
      await discourseFetch('/user-api-key/revoke', { method: 'POST' });
    } catch {
      // The key may already be revoked; signing out locally is what matters.
    }
  }
  const form = await request.formData().catch(() => null);
  const response = NextResponse.redirect(new URL(safeReturnPath(form?.get('return')), request.url), 303);
  response.cookies.delete(KEY_COOKIE);
  response.cookies.delete(CLIENT_COOKIE);
  return response;
}
