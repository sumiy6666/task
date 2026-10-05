import React from 'react';
import Link from 'next/link';

export function RelatedArticleGridCard({ article }) {
  return (
    <Link href={`/insights/${article.id}`} className="no-underline text-inherit block">
      <div className="flex flex-col h-full" style={{ gap: 'calc(0.6 * var(--sa))' }}>
        <img
          src={article.image || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=400&auto=format&fit=crop'}
          alt={article.title}
          className="w-full object-cover"
          style={{ height: 'calc(11 * var(--da) + var(--db))', borderRadius: 'calc(0.8 * var(--sa))', marginBottom: 'calc(0.5 * var(--sa))' }}
        />
        <h4 className="text-gray-900 leading-snug" style={{ fontSize: 'calc(1.05 * var(--fa) + var(--fb))', fontWeight: 500, marginBottom: 'calc(0.3 * var(--sa))' }}>
          {article.title}
        </h4>
        <p className="text-gray-500 leading-relaxed" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))' }}>
          {article.description}
        </p>
      </div>
    </Link>
  );
}
