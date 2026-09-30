'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Topic.module.css';
import { EmojiButton, insertAtCursor } from '../compose/EmojiButton';

function Reply({ post, onReply }) {
  return (
    <div className={styles.reply}>
      <img className={styles.avatarMd} src={post.author.avatar} alt="" />
      <div>
        <div className={styles.replyName}>{post.author.name}</div>
        {/* Discourse sanitises "cooked" HTML server-side before returning it. */}
        <div className={styles.replyBody} dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className={styles.replyMeta}>
          <button type="button" className={styles.replyLink} onClick={() => onReply(post)}>
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

export function Replies({ topicId, replies, currentUser }) {
  const router = useRouter();
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const startReply = (post) => {
    setReplyTo(post);
    inputRef.current?.focus();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return setError('Write a reply first.');
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/topics/${topicId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: text, replyToPostNumber: replyTo?.postNumber ?? null }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not post your reply.');
      setText('');
      setReplyTo(null);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {replies.map((post) => (
        <div key={post.id} className={styles.thread}>
          <Reply post={post} onReply={startReply} />
          {post.children.length > 0 && (
            <div className={styles.children}>
              {post.children.map((child) => (
                <Reply key={child.id} post={child} onReply={startReply} />
              ))}
            </div>
          )}
        </div>
      ))}

      <form className={styles.composer} onSubmit={submit}>
        <img className={styles.avatarMd} src={currentUser.avatar} alt="" />
        <div className={styles.composerForm}>
          {replyTo && (
            <span className={styles.replyingTo}>
              Replying to {replyTo.author.name}
              <button type="button" onClick={() => setReplyTo(null)}>Cancel</button>
            </span>
          )}
          <div className={styles.composerRow}>
            <div className={styles.replyInput}>
              <input
                ref={inputRef}
                aria-label="Write a reply"
                placeholder="Write a reply"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <EmojiButton align="right" className={styles.replyEmoji} onPick={(emoji) => setText((t) => insertAtCursor(inputRef.current, t, emoji))} />
            </div>
            <button type="submit" className={styles.postButton} disabled={busy}>
              {busy ? 'POSTING…' : 'POST'}
            </button>
          </div>
          {error && <span className={styles.error} role="alert">{error}</span>}
        </div>
      </form>
    </>
  );
}
