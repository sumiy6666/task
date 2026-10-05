import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

export function ActiveMembersList({ members }) {
  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: 'calc(1.2 * var(--sa))', padding: 'calc(1.8 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(1 * var(--sa)) rgba(0,0,0,0.03)' }}>
      <Reveal as="h3" className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: 'calc(1 * var(--fa) + var(--fb))', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: 'calc(1 * var(--sa))' }}>
        MOST ACTIVE MEMBERS
      </Reveal>
      <hr className="border-0" style={{ borderTop: 'calc(0.05 * var(--sa)) solid #eaeaea', margin: '0 0 calc(1.5 * var(--sa)) 0' }} />
      <Reveal stagger={120} className="flex flex-col" style={{ gap: 'calc(1.5 * var(--sa))' }}>
        {members.map((member, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center" style={{ gap: 'calc(1 * var(--sa))' }}>
              <img
                src={member.avatar}
                alt={member.name}
                className="rounded-full object-cover"
                style={{ width: 'calc(2.8 * var(--da) + var(--db))', height: 'calc(2.8 * var(--da) + var(--db))' }}
              />
              <div>
                <h4 className="font-semibold text-gray-900 leading-snug" style={{ fontSize: 'calc(0.9 * var(--fa) + var(--fb))' }}>
                  {member.name}
                </h4>
                <div className="text-gray-400" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))' }}>
                  {member.contributions} contributions
                </div>
              </div>
            </div>
            <button className="bg-transparent border-none text-gray-400 hover:text-[#00A4E4] cursor-pointer transition-colors flex-shrink-0" title="Follow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 'calc(1.5 * var(--da) + var(--db))', height: 'calc(1.5 * var(--da) + var(--db))' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="17" y1="11" x2="23" y2="11" />
              </svg>
            </button>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
