// Keeps a visitor's demo actions (new topics, replies, votes) in a cookie so
// demo mode survives across serverless instances. Replaying the actions over
// the seed data rebuilds the same state on every request.
import { cookies } from 'next/headers';
import { applyOp, createStore } from './mock';

const COOKIE = 'av_demo';
const MAX_COOKIE_CHARS = 3800; // browsers cap a cookie at about 4 KB
const MAX_RAW_CHARS = 1500;

async function readOps() {
  try {
    const value = (await cookies()).get(COOKIE)?.value;
    return value ? JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) : [];
  } catch {
    return [];
  }
}

export async function loadDemo() {
  const ops = await readOps();
  const store = createStore();
  for (const op of ops) applyOp(store, op);
  return { store, ops };
}

// Applies `op` and remembers it. Only callable from route handlers, which may set cookies.
export async function recordDemoOp({ store, ops }, op) {
  const saved = op.raw ? { ...op, raw: op.raw.slice(0, MAX_RAW_CHARS) } : op;
  const result = applyOp(store, saved);
  if (!result) return null;

  let next = [...ops, saved];
  let encoded = Buffer.from(JSON.stringify(next)).toString('base64url');
  // Drop the oldest actions when the cookie would get too large.
  while (encoded.length > MAX_COOKIE_CHARS && next.length > 1) {
    next = next.slice(1);
    encoded = Buffer.from(JSON.stringify(next)).toString('base64url');
  }
  (await cookies()).set(COOKIE, encoded, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
  });
  return result;
}
