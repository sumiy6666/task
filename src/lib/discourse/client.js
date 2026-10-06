// Server-side Discourse API client. Never import this from a client component:
// it reads API keys from the environment and the member's cookies.
import { getUserAuth } from './session';

const BASE_URL = (process.env.DISCOURSE_URL || '').replace(/\/+$/, '');
const API_KEY = process.env.DISCOURSE_API_KEY || '';
const API_USERNAME = process.env.DISCOURSE_API_USERNAME || 'system';
// Set SIGN_IN_ENABLED=false to switch member sign-in off (e.g. while the
// Discourse callback is being set up). Everyone then acts through
// DISCOURSE_API_KEY, or the app runs on demo data when there is no key.
const SIGN_IN_ENABLED = process.env.SIGN_IN_ENABLED !== 'false';

export class DiscourseError extends Error {
  constructor(message, status, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

// Discourse is used whenever its URL is set. Members act through their own
// User API Key (see ./user-api-key.js); DISCOURSE_API_KEY is an optional
// admin key used for guests' reads and for acting as DISCOURSE_API_USERNAME.
export function isDiscourseConfigured() {
  return Boolean(BASE_URL && (SIGN_IN_ENABLED || API_KEY));
}

export function isSignInEnabled() {
  return SIGN_IN_ENABLED && isDiscourseConfigured();
}

export function hasAdminKey() {
  return Boolean(API_KEY);
}

export function discourseBaseUrl() {
  return BASE_URL;
}

export function actingUsername() {
  return API_USERNAME;
}

export const SIGN_IN_REQUIRED = 'Please sign in to continue.';

// `revalidate` (seconds) lets shared, non-personal reads be cached briefly;
// it is ignored when a member's own key is in use.
export async function discourseFetch(path, { method = 'GET', body, formData, username, cache = 'no-store', revalidate, requireUser = method !== 'GET' } = {}) {
  if (!isDiscourseConfigured()) {
    throw new DiscourseError('Discourse is not configured (set DISCOURSE_URL).', 503);
  }

  const headers = { Accept: 'application/json' };
  const user = SIGN_IN_ENABLED ? await getUserAuth() : null;
  if (user) {
    headers['User-Api-Key'] = user.key;
    headers['User-Api-Client-Id'] = user.clientId;
  } else if (API_KEY) {
    headers['Api-Key'] = API_KEY;
    headers['Api-Username'] = username || API_USERNAME;
  } else if (requireUser) {
    throw new DiscourseError(SIGN_IN_REQUIRED, 401);
  }
  // Otherwise the request goes out as an anonymous guest (public reads).

  let payload;
  if (formData) {
    payload = formData;
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  const caching = revalidate && !user && method === 'GET' ? { next: { revalidate } } : { cache };
  const res = await fetch(`${BASE_URL}${path}`, { method, headers, body: payload, ...caching });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    // A revoked or expired member key comes back as 403 "invalid_access".
    if (user && (res.status === 401 || (res.status === 403 && data?.error_type === 'invalid_access'))) {
      throw new DiscourseError(SIGN_IN_REQUIRED, 401);
    }
    const errors = data?.errors || (data?.error ? [data.error] : []);
    throw new DiscourseError(errors[0] || `Discourse request failed (${res.status})`, res.status, errors);
  }
  return data;
}

// Discourse avatar templates look like "/user_avatar/host/name/{size}/1_2.png".
export function avatarUrl(template, size = 120) {
  if (!template) return '/images/avatar-placeholder.svg';
  const url = template.replace('{size}', String(size));
  if (/^https?:\/\//.test(url)) return url;
  if (url.startsWith('//')) return `https:${url}`;
  return `${BASE_URL}${url}`;
}

// Route handlers turn DiscourseError into a JSON response the UI can show.
export function errorResponse(error) {
  const status = error instanceof DiscourseError ? error.status : 500;
  const message = error instanceof DiscourseError ? error.message : 'Something went wrong. Please try again.';
  if (!(error instanceof DiscourseError)) console.error(error);
  return Response.json({ error: message, errors: error.errors || [] }, { status });
}
