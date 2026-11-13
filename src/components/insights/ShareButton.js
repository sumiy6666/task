'use client';
import { useState } from 'react';
import { ShareIcon } from '../topic/icons';
import styles from './Article.module.css';

// Shares the page through the phone's share sheet, or copies its link.
export function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // The share sheet was closed.
    }
  };

  return (
    <button type="button" className={styles.share} aria-label="Share" onClick={share}>
      <ShareIcon />
      {copied && <span role="status" className={styles.shareNote}>Link copied</span>}
    </button>
  );
}
