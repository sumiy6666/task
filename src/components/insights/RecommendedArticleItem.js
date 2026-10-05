import React from 'react';

export function RecommendedArticleItem({ article }) {
  return (
    <div className="flex border-b border-gray-100 last:border-b-0" style={{ gap: 'calc(0.8 * var(--sa))', padding: 'calc(1 * var(--sa)) 0' }}>
      <div className="rounded-full bg-[#00a4e4] flex items-center justify-center flex-shrink-0" style={{ width: 'calc(2.8 * var(--da) + var(--db))', height: 'calc(2.8 * var(--da) + var(--db))' }}>
        <img src="/images/chaticon.svg" alt="Article" style={{ width: 'calc(1.3 * var(--da) + var(--db))', height: 'calc(1.3 * var(--da) + var(--db))', filter: 'brightness(0) invert(1)' }} />
      </div>
      <div>
        <h4 className="font-medium text-gray-800 leading-snug" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))', marginBottom: 'calc(0.2 * var(--sa))' }}>
          {article.title}
        </h4>
        <div className="text-gray-400" style={{ fontSize: 'calc(0.65 * var(--fa) + var(--fb))' }}>
          {article.readTime}
        </div>
      </div>
    </div>
  );
}
