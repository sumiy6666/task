import React from 'react';
import Link from 'next/link';

const metaStyle = { fontSize: 'calc(0.95 * var(--fa) + var(--fb))', color: '#c2c2c2' };

export function InsightListCard({ article }) {
  return (
    <div className="flex max-sm:flex-col border-b border-[#e5e7eb]" style={{ gap: 'calc(1.45 * var(--sa))', padding: 'calc(2.4 * var(--sa)) 0' }}>
      <img
        src={article.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop'}
        alt={article.title}
        className="object-cover flex-shrink-0 max-sm:w-full! max-sm:h-[180px]!"
        style={{ width: 'calc(15.2 * var(--da) + var(--db))', height: 'calc(8.2 * var(--da) + var(--db))', borderRadius: 'calc(0.75 * var(--sa))', boxShadow: '0 calc(0.5 * var(--sa)) calc(1 * var(--sa)) rgba(0, 0, 0, 0.2)' }}
      />
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <Link prefetch={false} href={`/insights/${article.id}`} className="no-underline text-inherit">
          <h3 className="text-[#111] hover:text-[#00A4E4] transition-colors max-lg:max-w-none!" style={{ fontSize: 'calc(1.15 * var(--fa) + var(--fb))', fontWeight: 500, lineHeight: 1.36, marginBottom: 'calc(0.4 * var(--sa))', maxWidth: 'calc(20 * var(--da) + var(--db))' }}>
            {article.title}
          </h3>
        </Link>
        <p className="text-[#4b5563] line-clamp-2 max-lg:max-w-none!" style={{ fontSize: 'calc(0.95 * var(--fa) + var(--fb))', lineHeight: 1.45, marginBottom: 'calc(1 * var(--sa))', maxWidth: 'calc(22 * var(--da) + var(--db))' }}>
          {article.description}
        </p>
        <div className="flex justify-between items-center gap-x-4 max-sm:flex-col max-sm:items-start max-sm:gap-1">
          <div className="flex flex-wrap items-center whitespace-nowrap" style={{ ...metaStyle, gap: 'calc(1.6 * var(--sa))' }}>
            <span>{article.author}</span>
            <span>|</span>
            <span>{article.timeAgo}</span>
            <span>|</span>
            <span>{article.category}</span>
          </div>
          {article.readTime && (
            <div className="flex items-center flex-shrink-0 whitespace-nowrap" style={{ ...metaStyle, gap: 'calc(0.8 * var(--sa))' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 'calc(1.1 * var(--da) + var(--db))', height: 'calc(1.1 * var(--da) + var(--db))' }}>
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              <span>{article.readTime} read</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
