'use client';
import { useEffect, useState } from 'react';
import { redirectIfSignedOut } from '@/lib/auth-client';
import { ArrowLeft, Search, Send, SquarePen } from 'lucide-react';
import { THREADS } from './sampleProfile';
import { useProfileSection } from './useProfileSection';
import styles from './Profile.module.css';

// Messages tab: a chat with other members. Conversations on the left, the
// open one on the right; the pen button lists every member to start a new
// one. With the forum connected (`live`) these are the member's direct
// (private) messages: each conversation's messages load when it is opened,
// and messages are posted to it. `initialThreadId` opens one conversation
// (from a notification).
export function MessagesPanel({ live = false, initialThreadId = null }) {
  const [sample, setSample] = useState(THREADS);
  const [forum, setForum] = useProfileSection('messages', live);
  const threads = live ? forum.items || [] : sample;
  const setThreads = live ? (update) => setForum((all) => update(all || [])) : setSample;
  const [chosenId, setChosenId] = useState(live ? (initialThreadId ? Number(initialThreadId) : null) : THREADS[0].id);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  // Choosing someone to message: the list of members replaces the conversations.
  const [picking, setPicking] = useState(false);
  const [people] = useProfileSection('people', live && picking);
  const peopleList = live ? people.items || [] : THREADS.map((t) => ({ username: t.name, name: t.name, avatar: t.avatar, title: '' }));

  const term = query.trim().toLowerCase();
  const visible = term ? threads.filter((t) => t.name.toLowerCase().includes(term) || t.preview.toLowerCase().includes(term)) : threads;
  const visiblePeople = term ? peopleList.filter((p) => p.name.toLowerCase().includes(term) || p.username.toLowerCase().includes(term)) : peopleList;
  const activeId = chosenId ?? (picking ? null : threads[0]?.id);
  const active = threads.find((t) => t.id === activeId);
  const status = picking
    ? live && (people.loading ? 'Loading members…' : people.error || (peopleList.length === 0 && 'No members to message yet.'))
    : live && (forum.loading ? 'Loading…' : forum.error || (threads.length === 0 && 'No conversations yet. Choose the pen to message a member.'));

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

  // Picking a member opens your conversation with them, or a new, empty one
  // that is created on the forum when the first message is sent.
  const choosePerson = (person) => {
    setPicking(false);
    setQuery('');
    const existing = threads.find((t) => t.username === person.username || (!live && t.name === person.name));
    if (existing) return open(existing.id);
    const id = `new-${person.username}`;
    setThreads((all) => (all.some((t) => t.id === id) ? all : [{ id, username: person.username, name: person.name, avatar: person.avatar, preview: 'New conversation', time: '', unread: false, messages: [], isNew: true }, ...all]));
    setChosenId(id);
    setError('');
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
      // The first message to someone new starts the conversation.
      const res = active.isNew
        ? await fetch('/api/profile/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: active.username, text }),
          })
        : await fetch(`/api/topics/${active.id}/replies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ raw: text }),
          });
      if (redirectIfSignedOut(res)) return;
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send your message.');
      if (active.isNew && data.id) {
        setThreads((all) => all.map((t) => (t.id === active.id ? { ...t, id: data.id, isNew: false, preview: text } : t)));
        setChosenId(data.id);
      }
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
          {picking && (
            <button type="button" className={styles.backBtn} aria-label="Back to conversations" onClick={() => { setPicking(false); setQuery(''); }}>
              <ArrowLeft strokeWidth={1.5} />
            </button>
          )}
          <label className={styles.searchBox}>
            <Search strokeWidth={1.5} aria-hidden="true" />
            <input
              type="search"
              placeholder={picking ? 'Search members..' : 'Search messages..'}
              aria-label={picking ? 'Search members' : 'Search messages'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          {!picking && (
            <button type="button" className={styles.roundBtn} aria-label="New message" title="New message" onClick={() => { setPicking(true); setQuery(''); }}>
              <SquarePen strokeWidth={1.5} />
            </button>
          )}
        </div>

        {status && <p className={styles.threadText} style={{ padding: '12px 16px' }}>{status}</p>}

        {picking ? (
          <div role="list" aria-label="Members">
            {visiblePeople.map((p) => (
              <button key={p.username} type="button" role="listitem" className={styles.thread} onClick={() => choosePerson(p)}>
                <img className={styles.smallAvatar} src={p.avatar} alt="" />
                <span className={styles.threadBody}>
                  <span className={`block ${styles.threadName}`}>{p.name}</span>
                  <span className={`block ${styles.threadText}`}>{p.title || (live ? `@${p.username}` : 'Member')}</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
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
        )}
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
              <div className={styles.chatStatus}>{active.online ? 'Online' : live ? `@${active.username}` : 'Offline'}</div>
            </div>
          </div>

          <div className={styles.chatBody}>
            {active.messages === null && <p className={styles.chatStatus}>Loading…</p>}
            {active.messages?.length === 0 && <p className={styles.chatStatus}>Say hello to {active.name}.</p>}
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
