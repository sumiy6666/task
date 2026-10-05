import React from 'react';
import Link from 'next/link';

export function ActiveDiscussionsList({ discussions }) {
  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: 'calc(1.2 * var(--sa))', padding: 'calc(1.8 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(1 * var(--sa)) rgba(0,0,0,0.03)' }}>
      <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: 'calc(1 * var(--fa) + var(--fb))', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: 'calc(1.5 * var(--sa))' }}>
        RECENTLY ACTIVE DISCUSSIONS
      </h3>

      <div className="flex flex-col" style={{ gap: 'calc(1 * var(--sa))' }}>
        {discussions.map((disc, index) => (
          <div
            key={index}
            className="flex items-center justify-between transition-colors"
            style={{ padding: 'calc(1.2 * var(--sa)) calc(2 * var(--sa))', borderRadius: 'calc(3 * var(--sa))', backgroundColor: '#eef3f7' }}
          >
            <div>
              <Link href="#" className="no-underline text-inherit block" style={{ paddingRight: 'calc(2 * var(--sa))' }}>
                <h4 className="font-medium text-[#2d6896] hover:text-[#00A4E4] leading-snug" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))', marginBottom: 'calc(0.3 * var(--sa))' }}>
                  {disc.title}
                </h4>
              </Link>
              <div className="text-gray-500" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))' }}>
                {disc.author} &nbsp;|&nbsp; {disc.timeAgo} in {disc.category}
              </div>
            </div>

            <button className="rounded-full text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer border-none flex-shrink-0" style={{ width: 'calc(2.2 * var(--da) + var(--db))', height: 'calc(2.2 * var(--da) + var(--db))', backgroundColor: '#00A4E4' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1 * var(--da) + var(--db))', height: 'calc(1 * var(--da) + var(--db))' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
