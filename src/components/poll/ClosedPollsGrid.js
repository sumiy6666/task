'use client';
import { useState } from 'react';
import PollResultCard from '@/components/poll/PollResultCard';
import styles from './Poll.module.css';

const PAGE_SIZE = 6;

// Closed polls, three across with rules between columns; more load on request.
export default function ClosedPollsGrid({ polls }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visiblePolls = polls.slice(0, visibleCount);
  const hasMore = visibleCount < polls.length;

  return (
    <>
      <div className={styles.closedGrid}>
        {visiblePolls.map((poll) => (
          <div key={poll.id} className={`min-w-0 ${styles.closedCol}`}>
            <PollResultCard question={poll.question} options={poll.options} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMore}>
          <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className={styles.outlineBtn}>
            Load more
          </button>
        </div>
      )}
    </>
  );
}
