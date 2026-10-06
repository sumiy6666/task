// Server-side Discourse API client. Never import this from a client component:
// it reads API keys from the environment and the member's cookies.
import { revalidateTag } from 'next/cache';
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

// Shared reads (made with the site's API key, the same for every visitor) are
// cached for this long, so page views do not each hit the forum: Discourse
// rate-limits API keys per minute. Writes clear the cache straight away.
const SHARED_READ_SECONDS = 30;
const CACHE_TAG = 'discourse';
// Writes that do not change what other pages show.
const QUIET_WRITES = ['/drafts.json', '/uploads.json', '/user-api-key/revoke'];
// A rate-limited read is retried once when Discourse asks for a short wait.
const MAX_RETRY_WAIT_SECONDS = 4;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// `revalidate` (seconds) overrides how long a shared read is cached. Reads made
// with a member's own key are personal and never cached.
export async function discourseFetch(path, { method = 'GET', body, formData, username, revalidate = SHARED_READ_SECONDS, requireUser = method !== 'GET' } = {}, attempt = 0) {
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

  const caching = !user && method === 'GET' ? { next: { revalidate, tags: [CACHE_TAG] } } : { cache: 'no-store' };
  // A retry must reach the forum again: its own signal opts it out of Next's
  // per-render memoization, which would otherwise replay the first answer.
  const signal = attempt > 0 ? new AbortController().signal : undefined;
  const res = await fetch(`${BASE_URL}${path}`, { method, headers, body: payload, signal, ...caching });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const wait = Number(data?.extras?.wait_seconds ?? res.headers.get('retry-after'));
    if (res.status === 429 && method === 'GET' && attempt === 0 && wait > 0 && wait <= MAX_RETRY_WAIT_SECONDS) {
      await sleep(wait * 1000);
      return discourseFetch(path, { method, body, formData, username, revalidate, requireUser }, 1);
    }
    // A revoked or expired member key comes back as 403 "invalid_access".
    if (user && (res.status === 401 || (res.status === 403 && data?.error_type === 'invalid_access'))) {
      throw new DiscourseError(SIGN_IN_REQUIRED, 401);
    }
    const errors = data?.errors || (data?.error ? [data.error] : []);
    throw new DiscourseError(errors[0] || `Discourse request failed (${res.status})`, res.status, errors);
  }
  // Something changed on the forum: the next page view loads fresh lists.
  if (method !== 'GET' && !QUIET_WRITES.includes(path)) revalidateTag(CACHE_TAG, { expire: 0 });
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
