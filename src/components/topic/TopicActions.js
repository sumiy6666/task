'use client';

import { useState } from 'react';
import styles from './Topic.module.css';
import { BookmarkIcon, ShareIcon } from './icons';
import { redirectIfSignedOut } from '@/lib/auth-client';

export function TopicActions({ topicId, postId, title, initiallyBookmarked }) {
  const [bookmarked, setBookmarked] = useState(initiallyBookmarked);
  const [message, setMessage] = useState('');

  const flash = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2500);
  };

  // Pressing again removes the bookmark.
  const bookmark = async () => {
    const next = !bookmarked;
    setBookmarked(next);
    const res = await fetch(`/api/topics/${topicId}/bookmark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next ? { postId } : { postId, remove: true }),
    });
    if (redirectIfSignedOut(res)) return;
    if (!res.ok) {
      setBookmarked(!next);
      const data = await res.json().catch(() => ({}));
      return flash(data.error || 'Could not update the bookmark');
    }
    flash(next ? 'Bookmarked' : 'Bookmark removed');
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        flash('Link copied');
      }
    } catch {
      // The user closed the share sheet.
    }
  };

  return (
    <div className={styles.titleActions} style={{ position: 'relative' }}>
      <button type="button" className={styles.iconButton} aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'} aria-pressed={bookmarked} onClick={bookmark}>
        <BookmarkIcon filled={bookmarked} />
      </button>
      <button type="button" className={styles.iconButton} aria-label="Share" onClick={share}>
        <ShareIcon />
      </button>
      {message && (
        <span role="status" style={{ position: 'absolute', top: '100%', right: 0, marginTop: 6, fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>
          {message}
        </span>
      )}
    </div>
  );
}
