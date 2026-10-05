'use client';
import React, { useState } from 'react';

const tabs = ['MOST VIEWED', 'MOST REPLIED', 'MOST LIKED'];

export function TrendingDiscussions({ conversations }) {
  const [activeTab, setActiveTab] = useState('MOST VIEWED');

  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: 'calc(1.2 * var(--sa))', padding: 'calc(1.8 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(1 * var(--sa)) rgba(0,0,0,0.03)' }}>
      <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: 'calc(1 * var(--fa) + var(--fb))', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: 'calc(1.5 * var(--sa))' }}>
        TRENDING DISCUSSIONS
      </h3>

      <div className="flex" style={{ gap: 'calc(0.8 * var(--sa))', marginBottom: 'calc(1.5 * var(--sa))' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-medium rounded-full cursor-pointer transition-colors ${activeTab === tab ? 'text-white' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
            style={{
              padding: 'calc(0.7 * var(--sa)) calc(1.8 * var(--sa))',
              fontSize: 'calc(0.8 * var(--fa) + var(--fb))',
              border: 'none',
              backgroundColor: activeTab === tab ? '#003ECF' : undefined,
              boxShadow: activeTab === tab ? '0 calc(0.3 * var(--sa)) calc(0.8 * var(--sa)) rgba(0, 62, 207, 0.3)' : '0 calc(0.2 * var(--sa)) calc(0.8 * var(--sa)) rgba(0,0,0,0.06)'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {conversations.map((conv, index) => (
          <div key={conv.id} className="flex items-center max-sm:flex-wrap border-b border-gray-100 last:border-b-0" style={{ gap: 'calc(1 * var(--sa))', padding: 'calc(1.2 * var(--sa)) 0' }}>
            <img
              src={conv.author.avatar}
              alt={conv.author.name}
              className="rounded-full object-cover flex-shrink-0"
              style={{ width: 'calc(2.5 * var(--da) + var(--db))', height: 'calc(2.5 * var(--da) + var(--db))' }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 leading-snug hover:text-[#00A4E4] cursor-pointer transition-colors" style={{ fontSize: 'calc(0.9 * var(--fa) + var(--fb))', marginBottom: 'calc(0.2 * var(--sa))' }}>
                {conv.title}
              </h4>
              <div className="text-gray-400" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))' }}>
                {conv.author.name} &nbsp;|&nbsp; {conv.timeAgo} in {conv.category}
              </div>
            </div>

            <div className="flex items-center text-gray-400 max-sm:w-full max-sm:justify-end" style={{ gap: 'calc(1 * var(--sa))', fontSize: 'calc(0.85 * var(--fa) + var(--fb))' }}>
              <div className="flex items-center" style={{ gap: 'calc(0.3 * var(--sa))' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1.1 * var(--da) + var(--db))', height: 'calc(1.1 * var(--da) + var(--db))' }}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {conv.views}
              </div>
              <div className="flex items-center" style={{ gap: 'calc(0.3 * var(--sa))' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1.1 * var(--da) + var(--db))', height: 'calc(1.1 * var(--da) + var(--db))' }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {conv.replies}
              </div>
              <div className="flex items-center" style={{ gap: 'calc(0.3 * var(--sa))' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1.1 * var(--da) + var(--db))', height: 'calc(1.1 * var(--da) + var(--db))' }}>
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                {conv.likes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
