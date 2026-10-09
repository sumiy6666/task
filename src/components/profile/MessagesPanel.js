'use client';
import { useState } from 'react';
import { Search, Send, SquarePen } from 'lucide-react';
import { THREADS } from './sampleProfile';
import styles from './Profile.module.css';

// Messages tab: conversations on the left, the open one on the right.
export function MessagesPanel() {
  const [threads, setThreads] = useState(THREADS);
  const [activeId, setActiveId] = useState(THREADS[0].id);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');

  const term = query.trim().toLowerCase();
  const visible = term ? threads.filter((t) => t.name.toLowerCase().includes(term) || t.preview.toLowerCase().includes(term)) : threads;
  const active = threads.find((t) => t.id === activeId);

  const open = (id) => {
    setActiveId(id);
    setThreads((all) => all.map((t) => (t.id === id ? { ...t, unread: false } : t)));
  };

  // Sample conversations only keep the message on this page.
  const send = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    setThreads((all) => all.map((t) => (t.id === activeId ? { ...t, preview: text, time, messages: [...t.messages, { from: 'me', text, time }] } : t)));
    setDraft('');
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
            {active.messages.map((m, i) => (
              <div key={i} className="flex flex-col">
                <div className={`${styles.bubble} ${m.from === 'me' ? styles.bubbleOut : styles.bubbleIn}`}>{m.text}</div>
                <span className={`${styles.bubbleTime} ${m.from === 'me' ? styles.bubbleTimeOut : ''}`}>{m.time}</span>
              </div>
            ))}
          </div>

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
