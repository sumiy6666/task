'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { redirectIfSignedOut } from '@/lib/auth-client';
import styles from './Feed.module.css';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const withShares = (options) => {
  const total = options.reduce((sum, o) => sum + (o.votes || 0), 0);
  return options.map((o) => ({ ...o, share: total ? Math.round(((o.votes || 0) / total) * 100) : 0 }));
};

// A poll in the discussions feed. Picking an option votes straight away and
// marks it; results show once you have voted. Sample polls (no `postId`)
// only mark the choice on the page.
export function FeedPoll({ poll, href }) {
  const [options, setOptions] = useState(() => withShares(poll.options));
  const [chosen, setChosen] = useState(poll.userVotes || []);
  const [voters, setVoters] = useState(poll.voters ?? null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const voted = chosen.length > 0;

  const vote = async (option) => {
    if (busy || poll.closed) return;
    const before = chosen;
    setChosen([option.id]);
    setError('');
    if (!poll.postId) return;
    setBusy(true);
    try {
      const res = await fetch('/api/polls/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: poll.postId, pollName: poll.pollName, optionIds: [option.id] }),
      });
      if (redirectIfSignedOut(res)) return;
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not record your vote.');
      const counts = new Map(data.poll.options.map((o) => [o.id, o.votes]));
      setOptions((all) => withShares(all.map((o) => ({ ...o, votes: counts.get(o.id) ?? o.votes }))));
      setChosen(data.poll.userVotes?.length ? data.poll.userVotes : [option.id]);
      setVoters(data.poll.voters);
    } catch (e) {
      setChosen(before);
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <ul className={styles.options}>
        {options.map((option, i) => {
          const selected = chosen.includes(option.id);
          return (
            <li key={option.id}>
              <button
                type="button"
                className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
                aria-pressed={selected}
                disabled={busy || poll.closed}
                onClick={() => vote(option)}
              >
                {voted && poll.postId && <span className={styles.optionBar} style={{ width: `${option.share}%` }} aria-hidden="true" />}
                <span className={styles.optionLetter}>{selected ? <Check size={14} strokeWidth={2.5} aria-hidden="true" /> : LETTERS[i]}</span>
                <span className={styles.optionText}>{option.label}</span>
                {voted && poll.postId && <span className={styles.optionShare}>{option.share}%</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <div className={styles.pollMeta}>
        {error ? (
          <span role="alert" className={styles.pollError}>{error}</span>
        ) : (
          <span>
            {voted ? 'Your vote is in. ' : ''}
            {voters != null ? `${voters} ${voters === 1 ? 'vote' : 'votes'}` : ''}
          </span>
        )}
        <Link prefetch={false} href={href} className={styles.pollLink}>View discussion</Link>
      </div>
    </>
  );
}
