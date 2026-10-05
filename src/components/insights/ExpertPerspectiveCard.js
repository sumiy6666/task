import React from 'react';
import Link from 'next/link';

export function ExpertPerspectiveCard({ expert }) {
  return (
    <div
      className="text-white flex flex-col flex-1"
      style={{ background: expert.color || '#0056b3', borderRadius: 'calc(1 * var(--sa))', padding: 'calc(1.5 * var(--sa))' }}
    >
      <div className="flex items-center" style={{ gap: 'calc(0.8 * var(--sa))', marginBottom: 'calc(1.5 * var(--sa))' }}>
        <img src={expert.avatar} alt={expert.name} className="rounded-full object-cover" style={{ width: 'calc(3.2 * var(--da) + var(--db))', height: 'calc(3.2 * var(--da) + var(--db))' }} />
        <div>
          <div className="font-semibold" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))' }}>{expert.name}</div>
          <div style={{ fontSize: 'calc(0.65 * var(--fa) + var(--fb))', opacity: 0.8 }}>{expert.contributions} contributions</div>
        </div>
      </div>

      <h3 className="font-medium leading-snug flex-grow" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', marginBottom: 'calc(1.5 * var(--sa))' }}>
        {expert.title}
      </h3>

      <Link href="#" className="inline-flex items-center text-white no-underline uppercase font-medium hover:opacity-80 transition-opacity" style={{ gap: 'calc(0.4 * var(--sa))', fontSize: 'calc(0.65 * var(--fa) + var(--fb))', letterSpacing: '0.05em' }}>
        READ MORE
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(0.9 * var(--da) + var(--db))', height: 'calc(0.9 * var(--da) + var(--db))' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}
