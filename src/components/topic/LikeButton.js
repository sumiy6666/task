'use client';

import { useState } from 'react';
import styles from './Topic.module.css';
import { LikeIcon } from './icons';
import { redirectIfSignedOut } from '@/lib/auth-client';
import { compactNumber } from '@/lib/discourse/format';

// Likes the topic's first post; the count shown is the topic total.
export function LikeButton({ postId, initialLiked, initialCount }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    const next = !liked;
    setBusy(true);
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));
    const res = await fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ liked: next }),
    });
    if (redirectIfSignedOut(res)) return;
    if (!res.ok) {
      setLiked(!next);
      setCount((c) => c + (next ? -1 : 1));
    }
    setBusy(false);
  };

  return (
    <button type="button" className={`${styles.stat} ${liked ? styles.statActive : ''}`} aria-pressed={liked} aria-label="Like" disabled={busy} onClick={toggle}>
      <LikeIcon /> {compactNumber(count)}
    </button>
  );
}
