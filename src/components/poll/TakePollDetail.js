'use client';

import { useState } from 'react';
import Link from 'next/link';
import { redirectIfSignedOut } from '@/lib/auth-client';

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

  const letterLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: 'calc(1.2 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(0.8 * var(--sa)) rgba(0,0,0,0.06)', padding: 'calc(2.5 * var(--sa)) calc(3 * var(--sa))' }}>
      <h3 className="font-semibold text-[#00A4E4] uppercase" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))', letterSpacing: '0.1em', marginBottom: 'calc(1.5 * var(--sa))' }}>TAKE POLL</h3>

      <h2 className="font-medium text-[#132742]" style={{ fontSize: 'calc(0.95 * var(--fa) + var(--fb))', lineHeight: '1.5', marginBottom: 'calc(2.5 * var(--sa))' }}>
        {poll.question}
      </h2>

      <div className="flex flex-col" style={{ gap: 'calc(1 * var(--sa))' }}>
        {poll.options.map((option, index) => (
          <button
            type="button"
            key={index}
            onClick={() => vote(option)}
            disabled={!canVote || busy}
            aria-pressed={poll.userVotes?.includes(option.id) || false}
            className="flex items-center cursor-pointer transition-colors hover:bg-[#e2e5e8] text-left w-full disabled:cursor-default"
            style={{ padding: '0 calc(2 * var(--sa))', height: 'calc(2.5 * var(--da) + var(--db))', backgroundColor: poll.userVotes?.includes(option.id) ? '#d6ecf8' : '#f0f2f5', borderRadius: 'calc(2 * var(--sa))' }}
          >
            <span className="text-[#64748b] font-medium" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))', width: 'calc(3 * var(--da) + var(--db))' }}>{letterLabels[index]}</span>
            <span className="text-[#132742] font-medium flex-1" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))' }}>{option.label}</span>
            <span className="text-[#64748b] font-medium" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))' }}>{option.percentage}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between" style={{ marginTop: 'calc(1.5 * var(--sa))', fontSize: 'calc(0.75 * var(--fa) + var(--fb))' }}>
        <span className="text-[#64748b]" role={error ? 'alert' : undefined}>
          {error || (poll.voters != null ? `${poll.voters} ${poll.voters === 1 ? 'voter' : 'voters'}` : '')}
        </span>
        {poll.topicId && (
          <Link href={`/conversations/${poll.topicId}`} className="text-[#00A4E4] font-medium hover:underline">
            Open discussion →
          </Link>
        )}
      </div>
    </div>
  );
}
