// Server-side Discourse API client. Never import this from a client component:
// it reads the API key from the environment.

const BASE_URL = (process.env.DISCOURSE_URL || '').replace(/\/+$/, '');
const API_KEY = process.env.DISCOURSE_API_KEY || '';
const API_USERNAME = process.env.DISCOURSE_API_USERNAME || 'system';

export class DiscourseError extends Error {
  constructor(message, status, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export function isDiscourseConfigured() {
  return Boolean(BASE_URL && API_KEY);
}

export function discourseBaseUrl() {
  return BASE_URL;
}

export function actingUsername() {
  return API_USERNAME;
}

export async function discourseFetch(path, { method = 'GET', body, formData, username, cache = 'no-store' } = {}) {
  if (!isDiscourseConfigured()) {
    throw new DiscourseError('Discourse is not configured (set DISCOURSE_URL and DISCOURSE_API_KEY).', 503);
  }

  const headers = {
    'Api-Key': API_KEY,
    'Api-Username': username || API_USERNAME,
    Accept: 'application/json',
  };

  let payload;
  if (formData) {
    payload = formData;
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, { method, headers, body: payload, cache });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
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
