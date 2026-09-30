import React from 'react';
import Link from 'next/link';

export function InsightListCard({ article }) {
  return (
    <div className="flex border-b border-gray-100" style={{ gap: '1.2vw', padding: '1vw 0' }}>
      <img
        src={article.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop'}
        alt={article.title}
        className="object-cover flex-shrink-0"
        style={{ width: '14vw', height: '8.5vw', borderRadius: '0.5vw' }}
      />
      <div className="flex-1 flex flex-col justify-center">
        <Link href={`/insights/${article.id}`} className="no-underline text-inherit">
          <h3 className="font-semibold text-gray-900 leading-snug hover:text-[#00A4E4] transition-colors" style={{ fontSize: '0.9vw', marginBottom: '0.3vw' }}>
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-500 leading-relaxed line-clamp-2" style={{ fontSize: '0.8vw', marginBottom: '0.6vw' }}>
          {article.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-gray-400 flex items-center" style={{ fontSize: '0.7vw', gap: '0.4vw' }}>
            <span>{article.author}</span>
            <span>|</span>
            <span>{article.timeAgo}</span>
            <span>|</span>
            <span>{article.category}</span>
          </div>
          {article.readTime && (
            <div className="text-gray-300 flex items-center" style={{ gap: '0.3vw' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1vw', height: '1vw' }}>
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              <span style={{ fontSize: '1.1vw' }}>{article.readTime} read</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
