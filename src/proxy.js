import { NextResponse } from 'next/server';

// The community is for members: a visitor who isn't signed in is sent to the
// sign-in page, and comes back to the page they asked for after signing in.
// The Join page, sign-in itself, the legal pages and the API stay open.
// Skipped when the site runs without member sign-in (demo data or testing).
const KEY_COOKIE = 'av_user_key';
const OPEN = ['/signin', '/join', '/signup', '/about', '/privacy', '/terms', '/guidelines'];

// The page being rendered, passed on as a request header: when a member's key
// turns out to be revoked or expired mid-render, the server sends them to sign
// in again and back to this page (see discourseFetch; same name as
// PAGE_HEADER in lib/discourse/session.js).
const PAGE_HEADER = 'x-av-page';

function pass(request) {
  const headers = new Headers(request.headers);
  headers.set(PAGE_HEADER, `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.next({ request: { headers } });
}

export function proxy(request) {
  if (!process.env.DISCOURSE_URL || process.env.SIGN_IN_ENABLED === 'false') return NextResponse.next();
  const { pathname, search } = request.nextUrl;
  if (OPEN.some((path) => pathname === path || pathname.startsWith(`${path}/`))) return pass(request);
  if (request.cookies.get(KEY_COOKIE)?.value) return pass(request);

  const url = new URL('/signin', request.url);
  url.searchParams.set('return', `${pathname}${search}`);
  return NextResponse.redirect(url);
}

export const config = {
  // Pages only: not the API, Next's own files or anything with a file extension (images, icons).
  matcher: ['/((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).*)'],
};
