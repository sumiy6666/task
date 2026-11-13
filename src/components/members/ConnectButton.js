'use client';
import { useState } from 'react';
import Link from 'next/link';
import { redirectIfSignedOut } from '@/lib/auth-client';
import styles from './Members.module.css';

// CONNECT: write a first message to the member. It starts a private
// conversation on the forum, which then continues under Messages.
export function ConnectButton({ member, live }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [state, setState] = useState({ busy: false, error: '', sent: null });

  // A different member resets the box.
  const [shownFor, setShownFor] = useState(member.id);
  if (shownFor !== member.id) {
    setShownFor(member.id);
    setOpen(false);
    setText('');
    setState({ busy: false, error: '', sent: null });
  }

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim() || state.busy) return;
    if (!live || !member.username) return setState({ busy: false, error: '', sent: { sample: true } });
    setState({ busy: true, error: '', sent: null });
    const res = await fetch('/api/profile/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: member.username, text: text.trim() }),
    }).catch(() => null);
    if (res && redirectIfSignedOut(res)) return;
    const data = await res?.json().catch(() => ({}));
    if (!res?.ok) return setState({ busy: false, error: data?.error || 'Could not send your message. Please try again.', sent: null });
    setText('');
    setState({ busy: false, error: '', sent: data });
  };

  if (state.sent) {
    return (
      <div className={styles.connectDone} role="status">
        {state.sent.id ? (
          <>Message sent to {member.name}. <Link href={`/profile?tab=messages&thread=${state.sent.id}`}>Open conversation</Link></>
        ) : state.sent.pending ? (
          <>Message sent. It will reach {member.name} once a moderator approves it.</>
        ) : (
          <>Message sent to {member.name}.</>
        )}
      </div>
    );
  }

  if (!open) {
    return <button type="button" className={styles.follow} onClick={() => setOpen(true)}>CONNECT</button>;
  }

  return (
    <form className={styles.connectForm} onSubmit={send}>
      <textarea
        className={styles.connectText}
        rows={3}
        placeholder={`Write a message to ${member.name}`}
        aria-label={`Message to ${member.name}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      {state.error && <p className={styles.connectError} role="alert">{state.error}</p>}
      <div className={styles.connectActions}>
        <button type="button" className={styles.connectCancel} onClick={() => setOpen(false)}>Cancel</button>
        <button type="submit" className={styles.follow} disabled={state.busy || !text.trim()}>{state.busy ? 'SENDING…' : 'SEND'}</button>
      </div>
    </form>
  );
}
