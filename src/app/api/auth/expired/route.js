import { NextResponse } from 'next/server';
import { CLIENT_COOKIE, KEY_COOKIE, safeReturnPath } from '@/lib/discourse/session';

// A member's key that the forum no longer accepts (revoked or expired) is
// forgotten here, and they are sent to sign in again, then back to `return`.
export function GET(request) {
  const back = safeReturnPath(request.nextUrl.searchParams.get('return'));
  const url = new URL('/signin', request.url);
  if (back !== '/') url.searchParams.set('return', back);
  const response = NextResponse.redirect(url);
  response.cookies.delete(KEY_COOKIE);
  response.cookies.delete(CLIENT_COOKIE);
  return response;
}
