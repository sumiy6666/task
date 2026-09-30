// Browser-side helpers for the Discourse sign-in flow.

export function signInHref(path) {
  const current = path ?? `${window.location.pathname}${window.location.search}`;
  return `/api/auth/login?return=${encodeURIComponent(current)}`;
}

// When an API call says the member must sign in, send them to Discourse and
// bring them back here afterwards. Returns true if it redirected.
export function redirectIfSignedOut(res) {
  if (res.status !== 401) return false;
  window.location.assign(signInHref());
  return true;
}
