'use client';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmojiButton, insertAtCursor } from '../compose/EmojiButton';
import { redirectIfSignedOut } from '@/lib/auth-client';
import styles from './CommentBox.module.css';

// One-line reply box: avatar, a rounded input with an emoji picker, and POST.
// With a numeric `topicId` the text is posted as a reply to that forum topic
// (to `replyToPostNumber` when given); sample content has nowhere to post.
// `hideAvatar` keeps the avatar's space, so a reply box lines up with the one above it.
export function CommentBox({ topicId, replyToPostNumber = null, avatar, placeholder = 'Add a comment', size = 'md', hideAvatar = false, className = '' }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null); // { text, error }
  const canPost = /^\d+$/.test(String(topicId ?? ''));

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (!text.trim()) return setMessage({ text: 'Write something first.', error: true });
    if (!canPost) return setMessage({ text: 'This is sample content, so replies are not saved.', error: false });

    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/topics/${topicId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: text, replyToPostNumber }),
      });
      if (redirectIfSignedOut(res)) return;
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not post your reply.');
      setText('');
      setMessage({ text: data.pending ? 'Thanks! It will appear once a moderator approves it.' : 'Posted.', error: false });
      router.refresh();
    } catch (err) {
      setMessage({ text: err.message, error: true });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className={`${styles.box} ${styles[size]} ${className}`} onSubmit={submit}>
      <img className={`${styles.avatar} ${hideAvatar ? styles.hiddenAvatar : ''}`} src={avatar || '/images/avatar-placeholder.svg'} alt="" />
      <div className={styles.body}>
        <div className={styles.row}>
          <div className={styles.inputWrap}>
            <input
              ref={inputRef}
              className={styles.input}
              aria-label={placeholder}
              placeholder={placeholder}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (message) setMessage(null);
              }}
            />
            <EmojiButton align="right" className={styles.emoji} onPick={(emoji) => setText((t) => insertAtCursor(inputRef.current, t, emoji))} />
          </div>
          <button type="submit" className={styles.post} disabled={busy}>
            {busy ? 'POSTING…' : 'POST'}
          </button>
        </div>
        {message && (
          <p className={`${styles.message} ${message.error ? styles.error : ''}`} role={message.error ? 'alert' : 'status'}>
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}
