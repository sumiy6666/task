'use client';
import React, { useState } from 'react';
import { BookmarkIcon } from './icons';
import { redirectIfSignedOut } from '@/lib/auth-client';
import styles from './Feed.module.css';

// Bookmarks a forum topic. Sample topics (non-numeric ids) only toggle here.
export function BookmarkButton({ topicId, initiallyBookmarked = false }) {
  const [bookmarked, setBookmarked] = useState(initiallyBookmarked);
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    if (!/^\d+$/.test(String(topicId))) return setBookmarked((b) => !b);
    if (bookmarked || busy) return;
    setBusy(true);
    setBookmarked(true);
    const res = await fetch(`/api/topics/${topicId}/bookmark`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    if (redirectIfSignedOut(res)) return;
    if (!res.ok) setBookmarked(false);
    setBusy(false);
  };

  return (
    <button
      type="button"
      className={`${styles.bookmark} ${bookmarked ? styles.bookmarked : ''}`}
      aria-label={bookmarked ? 'Bookmarked' : 'Bookmark'}
      aria-pressed={bookmarked}
      onClick={toggle}
    >
      <BookmarkIcon fill={bookmarked ? 'currentColor' : 'none'} />
    </button>
  );
}
