'use client';
import { useCallback, useEffect, useState } from 'react';
import { redirectIfSignedOut } from '@/lib/auth-client';

// Loads one of the member's own profile lists (notifications, messages,
// bookmarks, drafts) from /api/profile the first time it is `enabled`, and
// keeps it while the profile is open. `items` stays null until it arrives.
export function useProfileSection(section, enabled) {
  const [state, setState] = useState({ items: null, error: '', done: false });

  useEffect(() => {
    if (!enabled || state.done) return;
    let cancelled = false;
    fetch(`/api/profile/${section}`)
      .then(async (res) => {
        if (redirectIfSignedOut(res)) return;
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Could not load this right now.');
        if (!cancelled) setState({ items: data.items, error: '', done: true });
      })
      .catch((e) => !cancelled && setState({ items: null, error: e.message, done: true }));
    return () => {
      cancelled = true;
    };
  }, [section, enabled, state.done]);

  // Updates the loaded items in place (e.g. marking them read).
  const setItems = useCallback((update) => setState((s) => ({ ...s, items: typeof update === 'function' ? update(s.items) : update })), []);
  return [{ items: state.items, error: state.error, loading: enabled && !state.done }, setItems];
}
