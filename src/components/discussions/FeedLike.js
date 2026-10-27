'use client';
import { useState } from 'react';
import { redirectIfSignedOut } from '@/lib/auth-client';
import { compactNumber } from '@/lib/discourse/format';
import { LikeIcon } from './icons';
import styles from './Feed.module.css';

// The like count on a feed card, as a button that likes the post. The forum
// doesn't let members like their own posts (`own`), so that count is plain.
export function FeedLike({ topicId, initialCount = 0, live, own = false }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (own) {
    return (
      <span className={styles.stat} title="You can’t like your own post">
        <LikeIcon />{compactNumber(count)}<span className="sr-only"> likes</span>
      </span>
    );
  }

  const toggle = async () => {
    const next = !liked;
    setBusy(true);
    setError('');
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
        const data = await res?.json().catch(() => ({}));
        // Liking twice (e.g. liked earlier on the conversation page) is refused:
        // the post is liked either way.
        if (next && /already|acted/i.test(data?.error || '')) {
          setCount((c) => Math.max(0, c - 1));
        } else {
          setLiked(!next);
          setCount((c) => Math.max(0, c + (next ? -1 : 1)));
          setError(data?.error || 'Could not save your like.');
        }
      }
    }
    setBusy(false);
  };

  return (
    <>
      <button type="button" className={`${styles.stat} ${styles.statButton} ${liked ? styles.statActive : ''}`} aria-pressed={liked} aria-label="Like" disabled={busy} onClick={toggle}>
        <LikeIcon />{compactNumber(count)}
      </button>
      {error && <span role="alert" className={styles.pollError}>{error}</span>}
    </>
  );
}
