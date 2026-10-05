'use client';
import { useState } from 'react';
import PollResultCard from '@/components/poll/PollResultCard';

const PAGE_SIZE = 6;

export default function ClosedPollsGrid({ polls }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visiblePolls = polls.slice(0, visibleCount);
  const hasMore = visibleCount < polls.length;

  return (
    <>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1" style={{ rowGap: 'calc(4 * var(--sa))' }}>
        {visiblePolls.map((poll, idx) => {
          const isRightColumn = (idx + 1) % 3 === 0;
          const isMiddleColumn = idx % 3 === 1;
          return (
            <div
              key={poll.id}
              style={{
                ...(isMiddleColumn ? { paddingLeft: 'calc(3 * var(--sa))', paddingRight: 'calc(3 * var(--sa))' } : {}),
                ...(!isRightColumn && !isMiddleColumn ? { paddingRight: 'calc(3 * var(--sa))' } : {}),
                ...(isRightColumn ? { paddingLeft: 'calc(3 * var(--sa))' } : {}),
                ...(!isRightColumn ? { borderRight: '1px solid #d1d5db' } : {})
              }}
            >
              <PollResultCard question={poll.question} options={poll.options} />
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center" style={{ marginTop: 'calc(4 * var(--sa))' }}>
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="bg-black hover:bg-[#333] text-white font-medium rounded-full transition-colors"
            style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', padding: 'calc(0.8 * var(--sa)) calc(2.4 * var(--sa))' }}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
