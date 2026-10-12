'use client';
import { useState } from 'react';
import { redirectIfSignedOut } from '@/lib/auth-client';
import { compactNumber } from '@/lib/discourse/format';
import { LikeIcon } from './icons';
import styles from './Feed.module.css';

// The like count on a feed card, as a button that likes the post.
export function FeedLike({ topicId, initialCount = 0, live }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    const next = !liked;
    setBusy(true);
    setLiked(next);
    setCount((c) => Math.max(0, c + (next ? 1 : -1)));
    if (live) {
      const res = await fetch(`/api/topics/${topicId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liked: next }),
      }).catch(() => null);
      if (res && redirectIfSignedOut(res)) return;
      if (!res?.ok) {
        setLiked(!next);
        setCount((c) => Math.max(0, c + (next ? -1 : 1)));
      }
    }
    setBusy(false);
  };

  return (
    <button type="button" className={`${styles.stat} ${styles.statButton} ${liked ? styles.statActive : ''}`} aria-pressed={liked} aria-label="Like" disabled={busy} onClick={toggle}>
      <LikeIcon />{compactNumber(count)}
    </button>
  );
}
