'use client';

import { useState } from 'react';
import styles from './Topic.module.css';
import { redirectIfSignedOut } from '@/lib/auth-client';

export function PollVote({ postId, poll: initialPoll }) {
  const [poll, setPoll] = useState(initialPoll);
  const [selected, setSelected] = useState(initialPoll.userVotes);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const multiple = poll.type === 'multiple';
  const closed = poll.status === 'closed' || (poll.closesAt && new Date(poll.closesAt) <= new Date());
  const hasVoted = poll.userVotes.length > 0;
  const showResults = hasVoted || closed;
  const total = poll.options.reduce((sum, o) => sum + o.votes, 0);

  const toggle = (id) => {
    if (closed) return;
    setSelected((cur) => (multiple ? (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]) : [id]));
  };

  const vote = async () => {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/polls/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, pollName: poll.name, optionIds: selected }),
      });
      if (redirectIfSignedOut(res)) return;
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not record your vote.');
      setPoll(data.poll);
      setSelected(data.poll.userVotes);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const closeLabel = poll.closesAt
    ? new Date(poll.closesAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })
    : null;

  return (
    <div className={styles.poll}>
      <ul className={styles.pollOptions}>
        {poll.options.map((o) => {
          const pct = total ? Math.round((o.votes / total) * 100) : 0;
          return (
            <li key={o.id}>
              <button type="button" className={styles.pollOption} aria-pressed={selected.includes(o.id)} disabled={closed || busy} onClick={() => toggle(o.id)}>
                {showResults && <span className={styles.pollBar} style={{ width: `${pct}%` }} aria-hidden />}
                <span>{o.text}</span>
                {showResults && <span>{pct}%</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <div className={styles.pollFooter}>
        {!closed && (
          <button type="button" className={styles.voteButton} disabled={busy || selected.length === 0} onClick={vote}>
            {hasVoted ? 'Update vote' : 'Vote'}
          </button>
        )}
        <span>
          {poll.voters} {poll.voters === 1 ? 'voter' : 'voters'}
          {multiple ? ' · Multiple choice' : ''}
          {closed ? ' · Poll closed' : closeLabel ? ` · Poll closes on ${closeLabel}` : ''}
        </span>
        {error && <span className={styles.error} role="alert">{error}</span>}
      </div>
    </div>
  );
}
