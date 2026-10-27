'use client';
import { useEffect, useState } from 'react';
import { redirectIfSignedOut } from '@/lib/auth-client';
import styles from './Approvals.module.css';

// Join requests with Approve / Decline. Approving lets the member in and
// Discourse emails them their login link; declining removes the request.
export function ApprovalsList() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch('/api/approvals')
      .then(async (res) => {
        if (redirectIfSignedOut(res)) return;
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Could not load the requests.');
        setItems(data.items || []);
      })
      .catch((e) => setError(e.message));
  }, []);

  const answer = async (item, action) => {
    if (action === 'decline' && !window.confirm(`Decline ${item.name}’s request? Their waiting account is removed.`)) return;
    setBusy(item.id);
    setError('');
    try {
      const res = await fetch(`/api/approvals/${item.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      if (redirectIfSignedOut(res)) return;
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'That didn’t work. Please try again.');
      setAnswers((a) => ({ ...a, [item.id]: action === 'approve' ? 'Approved: login email sent' : 'Declined' }));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className={styles.card} aria-labelledby="approvals-title">
      <h1 id="approvals-title" className={styles.title}>Join requests</h1>
      <p className={styles.intro}>
        People who asked to join from the Join page. Approve someone and they get an email with the link to log in and set
        their password.
      </p>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {items === null && !error && <p className={styles.status}>Loading…</p>}
      {items?.length === 0 && <p className={styles.status}>No requests are waiting. You&apos;re all caught up.</p>}

      <div role="list">
        {(items || []).map((item) => (
          <div key={item.id} role="listitem" className={styles.request}>
            <img className={styles.avatar} src={item.avatar} alt="" />
            <div className={styles.person}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.meta}>{item.email}{item.email && ' · '}asked {item.requested}</div>
              <div className={styles.details}>
                {item.fields.map((f) => <div key={f.label}><strong>{f.label}:</strong> {f.value}</div>)}
                {item.location && <div><strong>Location:</strong> {item.location}</div>}
                {item.website && <div><strong>Profile:</strong> <a href={item.website} target="_blank" rel="noreferrer">{item.website}</a></div>}
                {item.about && <div>{item.about}</div>}
              </div>
            </div>
            {answers[item.id] ? (
              <span className={styles.done}>{answers[item.id]}</span>
            ) : (
              <div className={styles.actions}>
                <button type="button" className={styles.approve} disabled={busy === item.id} onClick={() => answer(item, 'approve')}>APPROVE</button>
                <button type="button" className={styles.decline} disabled={busy === item.id} onClick={() => answer(item, 'decline')}>DECLINE</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
