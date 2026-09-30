import { NextResponse } from 'next/server';
import { cookieOptions, KEY_COOKIE, PENDING_COOKIE, safeReturnPath } from '@/lib/discourse/session';
import { decryptPayload } from '@/lib/discourse/user-api-key';

// Discourse redirects here with ?payload=<encrypted {key, nonce}> after the
// member approves the app.
export async function GET(request) {
  let pending = null;
  try {
    pending = JSON.parse(request.cookies.get(PENDING_COOKIE)?.value || 'null');
  } catch {
    pending = null;
  }
  const returnTo = safeReturnPath(pending?.returnTo);
  const fail = (reason) => {
    const url = new URL(returnTo, request.url);
    url.searchParams.set('signin', reason);
    const response = NextResponse.redirect(url);
    response.cookies.delete(PENDING_COOKIE);
    return response;
  };

  const payload = request.nextUrl.searchParams.get('payload');
  if (!payload || !pending?.key) return fail('expired');

  let data;
  try {
    data = decryptPayload(pending.key, payload);
  } catch (error) {
    console.error('User API key payload could not be decrypted', error);
    return fail('failed');
  }
  if (!data?.key || data.nonce !== pending.nonce) return fail('failed');

  const response = NextResponse.redirect(new URL(returnTo, request.url));
  response.cookies.set(KEY_COOKIE, data.key, cookieOptions(60 * 60 * 24 * 180));
  response.cookies.delete(PENDING_COOKIE);
  return response;
}
