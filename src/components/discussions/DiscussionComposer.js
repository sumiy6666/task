'use client';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryField } from '../compose/ComposeFlow';
import { EmojiButton, insertAtCursor } from '../compose/EmojiButton';
import { ImageIcon, LinkIcon } from '../compose/icons';
import styles from './Feed.module.css';

// "Start a Discussion" box at the top of the discussions page. It collects a
// title and category, then hands over to the full compose page to finish.
export function DiscussionComposer({ avatar, categories }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const options = categories.map((c) => ({ name: c.name }));
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(options[0]?.name || '');

  const compose = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (title.trim()) params.set('title', title.trim());
    if (category) params.set('category', category);
    router.push(`/conversations/new${params.size ? `?${params}` : ''}`);
  };

  return (
    <form className={styles.composer} onSubmit={compose}>
      <img className={styles.composerAvatar} src={avatar || '/images/avatar-placeholder.svg'} alt="" />
      <div className={styles.composerMain}>
        <div className={styles.composerRow}>
          <input
            ref={inputRef}
            className={styles.composerInput}
            placeholder="Start a Discussion"
            aria-label="Start a discussion"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {options.length > 0 && (
            <CategoryField categories={options} value={category} onChange={setCategory} className={styles.composerCategory} />
          )}
        </div>
        <div className={styles.composerFooter}>
          <div className={styles.composerTools}>
            <EmojiButton className={styles.toolButton} onPick={(emoji) => setTitle((t) => insertAtCursor(inputRef.current, t, emoji))} />
            {/* Images and links are added on the compose page. */}
            <button type="button" className={styles.toolButton} aria-label="Add an image" onClick={compose}><ImageIcon /></button>
            <button type="button" className={styles.toolButton} aria-label="Add a link" onClick={compose}><LinkIcon /></button>
          </div>
          <button type="submit" className={styles.postButton}>POST</button>
        </div>
      </div>
    </form>
  );
}
