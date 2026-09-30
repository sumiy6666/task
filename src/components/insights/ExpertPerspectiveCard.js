import React from 'react';
import Link from 'next/link';

export function ExpertPerspectiveCard({ expert }) {
  return (
    <div
      className="text-white flex flex-col flex-1"
      style={{ background: expert.color || '#0056b3', borderRadius: '1vw', padding: '1.5vw' }}
    >
      <div className="flex items-center" style={{ gap: '0.8vw', marginBottom: '1.5vw' }}>
        <img src={expert.avatar} alt={expert.name} className="rounded-full object-cover" style={{ width: '3.2vw', height: '3.2vw' }} />
        <div>
          <div className="font-semibold" style={{ fontSize: '0.85vw' }}>{expert.name}</div>
          <div style={{ fontSize: '0.65vw', opacity: 0.8 }}>{expert.contributions} contributions</div>
        </div>
      </div>

      <h3 className="font-medium leading-snug flex-grow" style={{ fontSize: '0.85vw', marginBottom: '1.5vw' }}>
        {expert.title}
      </h3>

      <Link href="#" className="inline-flex items-center text-white no-underline uppercase font-medium hover:opacity-80 transition-opacity" style={{ gap: '0.4vw', fontSize: '0.65vw', letterSpacing: '0.05em' }}>
        READ MORE
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.9vw', height: '0.9vw' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}
