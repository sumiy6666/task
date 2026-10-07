'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { redirectIfSignedOut } from '@/lib/auth-client';
import styles from './Poll.module.css';

const letterLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

// Recomputes the "NN%" labels after a vote from Discourse's raw counts.
function withPercentages(options) {
  const total = options.reduce((sum, o) => sum + (o.votes || 0), 0);
  return options.map((o) => ({ ...o, percentage: `${total ? Math.round(((o.votes || 0) / total) * 100) : 0}%` }));
}

export default function TakePollDetail({ poll: initialPoll }) {
  const [poll, setPoll] = useState(initialPoll);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  if (!poll) return null;

  // Forum polls (with a postId) vote through the API; sample polls are display-only.
  const canVote = Boolean(poll.postId) && !poll.closed;
  const vote = async (option) => {
    if (!canVote || busy) return;
    setBusy(true);
    setError('');
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
      setPoll((p) => ({
        ...p,
        voters: data.poll.voters,
        userVotes: data.poll.userVotes,
        options: withPercentages(p.options.map((o) => ({ ...o, votes: counts.get(o.id) ?? o.votes }))),
      }));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`flex flex-col h-full ${styles.panel} ${styles.take}`}>
      <Reveal as="h3" className={styles.takeLabel}>TAKE POLL</Reveal>

      <Reveal as="h2" delay={120} className={styles.takeQuestion}>
        {poll.question}
      </Reveal>

      <Reveal stagger={120} delay={240} className={styles.takeOptions}>
        {poll.options.map((option, index) => {
          const chosen = poll.userVotes?.includes(option.id) || false;
          return (
            <button
              type="button"
              key={option.id ?? index}
              onClick={() => vote(option)}
              disabled={!canVote || busy}
              aria-pressed={chosen}
              className={`${styles.takeOption} w-full text-left disabled:cursor-default`}
              style={chosen ? { background: '#d6ecf8' } : undefined}
            >
              <span className={styles.takeLetter}>{letterLabels[index]}</span>
              <span className={styles.takeText}>{option.label}</span>
              <span className={styles.takePct}>{option.percentage}</span>
            </button>
          );
        })}
      </Reveal>

      {(error || poll.voters != null || poll.topicId) && (
        <div className={`flex items-center justify-between ${styles.meta}`} style={{ marginTop: 'min(1.54vw, 20px)' }}>
          <span role={error ? 'alert' : undefined}>
            {error || (poll.voters != null ? `${poll.voters} ${poll.voters === 1 ? 'voter' : 'voters'}` : '')}
          </span>
          {poll.topicId && (
            <Link prefetch={false} href={`/conversations/${poll.topicId}`} className="text-[#11a0db] hover:underline">
              Open discussion →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
