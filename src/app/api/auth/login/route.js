import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { discourseBaseUrl, isSignInEnabled } from '@/lib/discourse/client';
import { CLIENT_COOKIE, cookieOptions, PENDING_COOKIE, safeReturnPath } from '@/lib/discourse/session';
import { createKeyPair, SCOPES } from '@/lib/discourse/user-api-key';

// Sends the member to Discourse to sign in and approve a User API Key.
export async function GET(request) {
  const returnTo = safeReturnPath(request.nextUrl.searchParams.get('return'));
  if (!isSignInEnabled()) return NextResponse.redirect(new URL(returnTo, request.url));

  const origin = process.env.APP_URL?.replace(/\/+$/, '') || request.nextUrl.origin;
  const clientId = request.cookies.get(CLIENT_COOKIE)?.value || crypto.randomUUID();
  const nonce = crypto.randomBytes(16).toString('hex');
  const { publicKeyPem, privateKeyDer } = createKeyPair();

  const url = new URL(`${discourseBaseUrl()}/user-api-key/new`);
  url.search = new URLSearchParams({
    application_name: 'AV Community',
    client_id: clientId,
    scopes: SCOPES,
    public_key: publicKeyPem,
    nonce,
    auth_redirect: `${origin}/api/auth/callback`,
    padding: 'oaep',
  }).toString();

  const response = NextResponse.redirect(url);
  response.cookies.set(CLIENT_COOKIE, clientId, cookieOptions(60 * 60 * 24 * 365));
  response.cookies.set(PENDING_COOKIE, JSON.stringify({ nonce, key: privateKeyDer, returnTo }), cookieOptions(60 * 15));
  return response;
}
