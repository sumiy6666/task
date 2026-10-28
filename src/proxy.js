import { NextResponse } from 'next/server';

// The community is for members: a visitor who isn't signed in is sent to the
// sign-in page, and comes back to the page they asked for after signing in.
// The Join page, sign-in itself, the legal pages and the API stay open.
// Skipped when the site runs without member sign-in (demo data or testing).
const KEY_COOKIE = 'av_user_key';
const OPEN = ['/signin', '/join', '/signup', '/about', '/privacy', '/terms', '/guidelines'];

export function proxy(request) {
  if (!process.env.DISCOURSE_URL || process.env.SIGN_IN_ENABLED === 'false') return NextResponse.next();
  const { pathname, search } = request.nextUrl;
  if (OPEN.some((path) => pathname === path || pathname.startsWith(`${path}/`))) return NextResponse.next();
  if (request.cookies.get(KEY_COOKIE)?.value) return NextResponse.next();

  const url = new URL('/signin', request.url);
  url.searchParams.set('return', `${pathname}${search}`);
  return NextResponse.redirect(url);
}

export const config = {
  // Pages only: not the API, Next's own files or anything with a file extension (images, icons).
  matcher: ['/((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).*)'],
};
