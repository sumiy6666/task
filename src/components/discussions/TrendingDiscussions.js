'use client';
import React, { useState } from 'react';

const tabs = ['MOST VIEWED', 'MOST REPLIED', 'MOST LIKED'];

export function TrendingDiscussions({ conversations }) {
  const [activeTab, setActiveTab] = useState('MOST VIEWED');

  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: '1.2vw', padding: '1.8vw', boxShadow: '0 0.2vw 1vw rgba(0,0,0,0.03)' }}>
      <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: '1vw', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: '1.5vw' }}>
        TRENDING DISCUSSIONS
      </h3>

      <div className="flex" style={{ gap: '0.8vw', marginBottom: '1.5vw' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-medium rounded-full cursor-pointer transition-colors ${activeTab === tab ? 'text-white' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
            style={{
              padding: '0.7vw 1.8vw',
              fontSize: '0.8vw',
              border: 'none',
              backgroundColor: activeTab === tab ? '#003ECF' : undefined,
              boxShadow: activeTab === tab ? '0 0.3vw 0.8vw rgba(0, 62, 207, 0.3)' : '0 0.2vw 0.8vw rgba(0,0,0,0.06)'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {conversations.map((conv, index) => (
          <div key={conv.id} className="flex items-center border-b border-gray-100 last:border-b-0" style={{ gap: '1vw', padding: '1.2vw 0' }}>
            <img
              src={conv.author.avatar}
              alt={conv.author.name}
              className="rounded-full object-cover flex-shrink-0"
              style={{ width: '2.5vw', height: '2.5vw' }}
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 leading-snug hover:text-[#00A4E4] cursor-pointer transition-colors" style={{ fontSize: '0.9vw', marginBottom: '0.2vw' }}>
                {conv.title}
              </h4>
              <div className="text-gray-400" style={{ fontSize: '0.7vw' }}>
                {conv.author.name} &nbsp;|&nbsp; {conv.timeAgo} in {conv.category}
              </div>
            </div>

            <div className="flex items-center text-gray-400" style={{ gap: '1vw', fontSize: '0.85vw' }}>
              <div className="flex items-center" style={{ gap: '0.3vw' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.1vw', height: '1.1vw' }}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {conv.views}
              </div>
              <div className="flex items-center" style={{ gap: '0.3vw' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.1vw', height: '1.1vw' }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {conv.replies}
              </div>
              <div className="flex items-center" style={{ gap: '0.3vw' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.1vw', height: '1.1vw' }}>
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
