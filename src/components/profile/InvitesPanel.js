'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Copy, Mail } from 'lucide-react';
import styles from './Profile.module.css';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Invites tab: invite colleagues to AV Community. Everyone joins through the
// Join page and our team approves each request, so an invite is the Join
// link, sent from the member's own email or copied to share. Staff also see
// the requests waiting for them.
export function InvitesPanel({ staff = false }) {
  const [emails, setEmails] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState(null); // { text, error }

  const joinUrl = () => `${window.location.origin}/join`;

  const invite = (e) => {
    e.preventDefault();
    const list = emails.split(/[\s,;]+/).filter(Boolean);
    if (list.length === 0 || !list.every((x) => EMAIL.test(x))) return setMessage({ text: 'Enter one or more email addresses.', error: true });
    const subject = 'Join me on AV Community';
    const body = `${note.trim() ? `${note.trim()}\n\n` : ''}AV Community is a private community for family office professionals. Ask to join here: ${joinUrl()}`;
    window.location.href = `mailto:${list.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMessage({ text: 'Your email app has the invitation ready to send.', error: false });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl());
      setMessage({ text: 'Invite link copied.', error: false });
    } catch {
      setMessage({ text: `Copy this link: ${joinUrl()}`, error: false });
    }
  };

  return (
    <section className={`${styles.card} ${styles.listPanel}`} aria-labelledby="invites-title">
      <h2 id="invites-title" className={styles.panelTitle}>Invites</h2>
      <p className={styles.inviteIntro}>
        Invite colleagues to AV Community. They ask to join with your link, and our team reviews each request.
      </p>

      <form className={styles.inviteForm} onSubmit={invite}>
        <label className={styles.inviteLabel}>
          Email addresses
          <input className={styles.inviteInput} value={emails} onChange={(e) => setEmails(e.target.value)} placeholder="name@company.com, another@company.com" autoComplete="off" />
        </label>
        <label className={styles.inviteLabel}>
          Personal note (optional)
          <textarea className={`${styles.inviteInput} ${styles.inviteNoteInput}`} value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
        </label>
        <div className={styles.inviteButtons}>
          <button type="submit" className={styles.accept} style={{ width: 'auto', padding: '0 20px', gap: 8 }}><Mail size={16} aria-hidden="true" />SEND INVITE</button>
          <button type="button" className={styles.decline} style={{ width: 'auto', padding: '0 20px', gap: 8 }} onClick={copy}><Copy size={16} aria-hidden="true" />COPY LINK</button>
        </div>
        {message && <p role={message.error ? 'alert' : 'status'} className={styles.inviteMessage} style={message.error ? { color: '#b42318' } : undefined}>{message.text}</p>}
      </form>

      {staff && (
        <p className={styles.inviteIntro}>
          Requests waiting for approval are on <Link href="/approvals" className={styles.blueLink}>Join requests</Link>.
        </p>
      )}
    </section>
  );
}
