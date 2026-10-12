'use client';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { redirectIfSignedOut } from '@/lib/auth-client';
import { CategoryField } from '../compose/ComposeFlow';
import { EmojiButton, insertAtCursor } from '../compose/EmojiButton';
import { ImageIcon, LinkIcon } from '../compose/icons';
import styles from './Feed.module.css';

// "Start a Discussion" box at the top of the discussions page. It collects a
// title, category, images and links, then hands over to the full compose
// page to write the post.
export function DiscussionComposer({ avatar, categories }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const options = categories.map((c) => ({ name: c.name }));
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(options[0]?.name || '');
  const [attachments, setAttachments] = useState([]); // { label, markdown }
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const compose = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (title.trim()) params.set('title', title.trim());
    if (category) params.set('category', category);
    if (attachments.length) params.set('body', attachments.map((a) => a.markdown).join('\n\n'));
    router.push(`/conversations/new${params.size ? `?${params}` : ''}`);
  };

  const addImage = async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/uploads', { method: 'POST', body: form });
      if (redirectIfSignedOut(res)) return;
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Upload failed.');
      setAttachments((all) => [...all, { label: file.name, markdown: data.markdown }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const addLink = () => {
    const url = window.prompt('Link URL', 'https://');
    if (!url || url === 'https://') return;
    setAttachments((all) => [...all, { label: url, markdown: `[${url}](${url})` }]);
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
        {(attachments.length > 0 || uploading || error) && (
          <div className={styles.attachments}>
            {attachments.map((a, i) => (
              <span key={i} className={styles.attachment}>
                <span className={styles.attachmentLabel}>{a.label}</span>
                <button type="button" aria-label={`Remove ${a.label}`} onClick={() => setAttachments((all) => all.filter((_, j) => j !== i))}>
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            ))}
            {uploading && <span className={styles.attachment}>Uploading…</span>}
            {error && <span role="alert" className={styles.pollError}>{error}</span>}
          </div>
        )}
        <div className={styles.composerFooter}>
          <div className={styles.composerTools}>
            <EmojiButton className={styles.toolButton} onPick={(emoji) => setTitle((t) => insertAtCursor(inputRef.current, t, emoji))} />
            <button type="button" className={styles.toolButton} aria-label="Add an image" disabled={uploading} onClick={() => fileRef.current?.click()}><ImageIcon /></button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => addImage(e.target.files?.[0])} />
            <button type="button" className={styles.toolButton} aria-label="Add a link" onClick={addLink}><LinkIcon /></button>
          </div>
          <button type="submit" className={styles.postButton}>POST</button>
        </div>
      </div>
    </form>
  );
}
