// The signed-in member's Discourse User API Key lives in httpOnly cookies, so
// browser scripts never see it and every server request can act as them.
import { cookies } from 'next/headers';

export const KEY_COOKIE = 'av_user_key';
export const CLIENT_COOKIE = 'av_client_id';
export const PENDING_COOKIE = 'av_auth_pending';

export const cookieOptions = (maxAge) => ({
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  maxAge,
});

export async function getUserAuth() {
  const jar = await cookies();
  const key = jar.get(KEY_COOKIE)?.value;
  const clientId = jar.get(CLIENT_COOKIE)?.value;
  return key && clientId ? { key, clientId } : null;
}

// Only same-site paths, so the sign-in flow cannot be used as an open redirect.
export function safeReturnPath(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : '/';
}
