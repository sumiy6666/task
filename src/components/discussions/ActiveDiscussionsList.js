import React from 'react';
import Link from 'next/link';

export function ActiveDiscussionsList({ discussions }) {
  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: '1.2vw', padding: '1.8vw', boxShadow: '0 0.2vw 1vw rgba(0,0,0,0.03)' }}>
      <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: '1vw', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: '1.5vw' }}>
        RECENTLY ACTIVE DISCUSSIONS
      </h3>

      <div className="flex flex-col" style={{ gap: '1vw' }}>
        {discussions.map((disc, index) => (
          <div
            key={index}
            className="flex items-center justify-between transition-colors"
            style={{ padding: '1.2vw 2vw', borderRadius: '3vw', backgroundColor: '#eef3f7' }}
          >
            <div>
              <Link href="#" className="no-underline text-inherit block pr-[2vw]">
                <h4 className="font-medium text-[#2d6896] hover:text-[#00A4E4] leading-snug" style={{ fontSize: '1vw', marginBottom: '0.3vw' }}>
                  {disc.title}
                </h4>
              </Link>
              <div className="text-gray-500" style={{ fontSize: '0.8vw' }}>
                {disc.author} &nbsp;|&nbsp; {disc.timeAgo} in {disc.category}
              </div>
            </div>

            <button className="rounded-full text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer border-none flex-shrink-0" style={{ width: '2.2vw', height: '2.2vw', backgroundColor: '#00A4E4' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1vw', height: '1vw' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
