'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { redirectIfSignedOut } from '@/lib/auth-client';
import styles from './ArticleFooter.module.css';

// "Leave your comments" box at the end of an insight article. On a forum
// article (`topicId`) the comment is posted as a reply to that topic; on the
// sample article there is nowhere to post it.
export function CommentForm({ topicId }) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');

  const submit = async () => {
    if (!topicId || status === 'sending') return;
    if (!text.trim()) {
      setError('Please write a comment first.');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(`/api/topics/${topicId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: text }),
      });
      if (redirectIfSignedOut(res)) return;
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not post your comment.');
      setText('');
      setStatus('sent');
    } catch (e) {
      setError(e.message);
      setStatus('idle');
    }
  };

  return (
    <section className={styles.comments}>
      <label htmlFor="article-comment" className={`block ${styles.commentsTitle}`}>Leave your comments</label>
      <textarea
        id="article-comment"
        rows={3}
        className={styles.commentsInput}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (status === 'sent') setStatus('idle');
        }}
      />
      {(error || status === 'sent') && (
        <p role={error ? 'alert' : 'status'} style={{ margin: '8px 0', fontSize: 14, color: error ? '#b42318' : '#027a48' }}>
          {error || (
            <>
              Thanks, your comment is posted. <Link href={`/conversations/${topicId}`} className="underline">See the discussion</Link>
            </>
          )}
        </p>
      )}
      <button type="button" className={styles.submit} onClick={submit} disabled={status === 'sending'}>
        {status === 'sending' ? 'POSTING…' : 'SUBMIT'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </section>
  );
}
