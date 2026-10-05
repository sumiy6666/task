import React from 'react';
import Link from 'next/link';

export function InsightListCard({ article }) {
  return (
    <div className="flex border-b border-gray-100" style={{ gap: 'calc(1.2 * var(--sa))', padding: 'calc(1 * var(--sa)) 0' }}>
      <img
        src={article.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop'}
        alt={article.title}
        className="object-cover flex-shrink-0"
        style={{ width: 'calc(14 * var(--da) + var(--db))', height: 'calc(8.5 * var(--da) + var(--db))', borderRadius: 'calc(0.5 * var(--sa))' }}
      />
      <div className="flex-1 flex flex-col justify-center">
        <Link href={`/insights/${article.id}`} className="no-underline text-inherit">
          <h3 className="font-semibold text-gray-900 leading-snug hover:text-[#00A4E4] transition-colors" style={{ fontSize: 'calc(0.9 * var(--fa) + var(--fb))', marginBottom: 'calc(0.3 * var(--sa))' }}>
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-500 leading-relaxed line-clamp-2" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))', marginBottom: 'calc(0.6 * var(--sa))' }}>
          {article.description}
        </p>
        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-1">
          <div className="text-gray-400 flex flex-wrap items-center whitespace-nowrap" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))', gap: 'calc(0.4 * var(--sa))' }}>
            <span>{article.author}</span>
            <span>|</span>
            <span>{article.timeAgo}</span>
            <span>|</span>
            <span>{article.category}</span>
          </div>
          {article.readTime && (
            <div className="text-gray-300 flex items-center" style={{ gap: 'calc(0.3 * var(--sa))' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1 * var(--da) + var(--db))', height: 'calc(1 * var(--da) + var(--db))' }}>
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              <span style={{ fontSize: 'calc(1.1 * var(--fa) + var(--fb))' }}>{article.readTime} read</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
