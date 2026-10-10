'use client';
import { useEffect, useState } from 'react';
import { redirectIfSignedOut } from '@/lib/auth-client';
import { Search, Send, SquarePen } from 'lucide-react';
import { THREADS } from './sampleProfile';
import { useProfileSection } from './useProfileSection';
import styles from './Profile.module.css';

// Messages tab: conversations on the left, the open one on the right. With
// the forum connected (`live`) these are the member's private messages: each
// conversation's messages load when it is opened, and replies are posted.
export function MessagesPanel({ live = false }) {
  const [sample, setSample] = useState(THREADS);
  const [forum, setForum] = useProfileSection('messages', live);
  const threads = live ? forum.items || [] : sample;
  const setThreads = live ? (update) => setForum((all) => update(all || [])) : setSample;
  const [chosenId, setChosenId] = useState(live ? null : THREADS[0].id);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  const term = query.trim().toLowerCase();
  const visible = term ? threads.filter((t) => t.name.toLowerCase().includes(term) || t.preview.toLowerCase().includes(term)) : threads;
  const activeId = chosenId ?? threads[0]?.id;
  const active = threads.find((t) => t.id === activeId);
  const status = live && (forum.loading ? 'Loading…' : forum.error || (threads.length === 0 && 'No messages yet.'));

  const setMessages = (id, messages) => setThreads((all) => all.map((t) => (t.id === id ? { ...t, messages } : t)));

  // A forum conversation's messages are fetched the first time it is shown.
  const needsMessages = live && active && active.messages === null;
  useEffect(() => {
    if (!needsMessages) return;
    const id = activeId;
    fetch(`/api/profile/messages/${id}`)
      .then((res) => (redirectIfSignedOut(res) ? null : res.json()))
      .then((data) => data && setForum((all) => (all || []).map((t) => (t.id === id ? { ...t, messages: data.messages || [] } : t))))
      .catch(() => setForum((all) => (all || []).map((t) => (t.id === id ? { ...t, messages: [] } : t))));
  }, [needsMessages, activeId, setForum]);

  const open = (id) => {
    setChosenId(id);
    setError('');
    setThreads((all) => all.map((t) => (t.id === id ? { ...t, unread: false } : t)));
  };

  // Forum replies are posted; sample conversations only keep the message on
  // this page. A failed send is put back in the box.
  const send = async (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !active) return;
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const before = active.messages || [];
    setThreads((all) => all.map((t) => (t.id === activeId ? { ...t, preview: live ? t.preview : text, time: live ? 'just now' : time, messages: [...before, { from: 'me', text, time }] } : t)));
    setDraft('');
    setError('');
    if (!live) return;
    try {
      const res = await fetch(`/api/topics/${active.id}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: text }),
      });
      if (redirectIfSignedOut(res)) return;
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send your message.');
    } catch (err) {
      setMessages(active.id, before);
      setDraft(text);
      setError(err.message);
    }
  };

  return (
    <section className={`${styles.card} ${styles.messages}`} aria-labelledby="messages-title">
      <div className={styles.threads}>
        <h2 id="messages-title" className={`${styles.panelTitle} ${styles.threadsHead}`}>Messages</h2>
        <div className={styles.threadSearch}>
          <label className={styles.searchBox}>
            <Search strokeWidth={1.5} aria-hidden="true" />
            <input type="search" placeholder="Search messages.." aria-label="Search messages" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <button type="button" className={styles.roundBtn} aria-label="New message"><SquarePen strokeWidth={1.5} /></button>
        </div>

        {status && <p className={styles.threadText} style={{ padding: '12px 16px' }}>{status}</p>}

        <div role="list">
          {visible.map((t) => (
            <button
              key={t.id}
              type="button"
              role="listitem"
              className={`${styles.thread} ${t.id === activeId ? styles.threadActive : ''}`}
              onClick={() => open(t.id)}
            >
              <img className={styles.smallAvatar} src={t.avatar} alt="" />
              <span className={styles.threadBody}>
                <span className={`block ${styles.threadName}`}>{t.name}</span>
                <span className={`block ${styles.threadText}`}>{t.preview}</span>
              </span>
              <span className={styles.threadMeta}>
                {t.time}
                {t.unread && <span className={styles.unread} aria-label="Unread" />}
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className={styles.chat}>
          <div className={styles.chatHead}>
            <span className={styles.chatAvatar}>
              <img className={styles.smallAvatar} src={active.avatar} alt="" />
              {active.online && <span className={styles.online} />}
            </span>
            <div>
              <div className={styles.threadName}>{active.name}</div>
              <div className={styles.chatStatus}>{active.online ? 'Online' : 'Offline'}</div>
            </div>
          </div>

          <div className={styles.chatBody}>
            {active.messages === null && <p className={styles.chatStatus}>Loading…</p>}
            {(active.messages || []).map((m, i) => (
              <div key={i} className="flex flex-col">
                <div className={`${styles.bubble} ${m.from === 'me' ? styles.bubbleOut : styles.bubbleIn}`}>{m.text}</div>
                <span className={`${styles.bubbleTime} ${m.from === 'me' ? styles.bubbleTimeOut : ''}`}>{m.time}</span>
              </div>
            ))}
          </div>

          {error && <p role="alert" className={styles.chatStatus} style={{ color: '#b42318', padding: '0 16px' }}>{error}</p>}
          <form className={styles.composer} onSubmit={send}>
            <label className={styles.searchBox}>
              <input placeholder="Write a message" aria-label="Write a message" value={draft} onChange={(e) => setDraft(e.target.value)} />
            </label>
            <button type="submit" className={styles.roundBtn} aria-label="Send"><Send strokeWidth={1.5} /></button>
          </form>
        </div>
      )}
    </section>
  );
}
