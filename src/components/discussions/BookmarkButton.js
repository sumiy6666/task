'use client';
import React, { useState } from 'react';
import { BookmarkIcon } from './icons';
import { redirectIfSignedOut } from '@/lib/auth-client';
import styles from './Feed.module.css';

// Bookmarks a forum topic, or removes the bookmark when pressed again.
// Sample topics (non-numeric ids) only toggle here.
export function BookmarkButton({ topicId, initiallyBookmarked = false }) {
  const [bookmarked, setBookmarked] = useState(initiallyBookmarked);
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    if (!/^\d+$/.test(String(topicId))) return setBookmarked((b) => !b);
    if (busy) return;
    const next = !bookmarked;
    setBusy(true);
    setBookmarked(next);
    const res = await fetch(`/api/topics/${topicId}/bookmark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next ? {} : { remove: true }),
    }).catch(() => null);
    if (res && redirectIfSignedOut(res)) return;
    if (!res?.ok) setBookmarked(!next);
    setBusy(false);
  };

  return (
    <button
      type="button"
      className={`${styles.bookmark} ${bookmarked ? styles.bookmarked : ''}`}
      aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
      title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
      aria-pressed={bookmarked}
      disabled={busy}
      onClick={toggle}
    >
      <BookmarkIcon fill={bookmarked ? 'currentColor' : 'none'} />
    </button>
  );
}
