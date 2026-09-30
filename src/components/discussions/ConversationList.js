import React from 'react';
import Link from 'next/link';

export function ConversationItem({ conversation, isFirst }) {
  return (
    <div className="flex border-b border-gray-100 last:border-b-0" style={{ gap: '1.2vw', padding: '1.2vw 0' }}>
      <img
        src={conversation.author.avatar}
        alt={conversation.author.name}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: '3.5vw', height: '3.5vw' }}
      />

      <div className="flex-1 flex flex-col justify-center">
        <Link href={`#`} className="no-underline">
          <h4 className={`${isFirst ? 'text-[#003ECF]' : 'text-gray-900'} leading-snug hover:text-[#00A4E4] transition-colors`} style={{ fontSize: '1.05vw', fontWeight: 500, marginBottom: '0.4vw', maxWidth: '80%' }}>
            {conversation.title}
          </h4>
        </Link>

        <div className="text-gray-400 flex items-center" style={{ fontSize: '0.75vw', gap: '0.5vw' }}>
          <span>{conversation.author.name}</span>
          <span>|</span>
          <span>{conversation.timeAgo} in {conversation.category}</span>
        </div>
      </div>

      <div className="flex items-center text-gray-400" style={{ gap: '1.2vw', fontSize: '0.9vw' }}>
        {conversation.views && (
          <div className="flex items-center" style={{ gap: '0.3vw' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.2vw', height: '1.2vw' }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {conversation.views}
          </div>
        )}
        <div className="flex items-center" style={{ gap: '0.3vw' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.2vw', height: '1.2vw' }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {conversation.replies}
        </div>
        <div className="flex items-center" style={{ gap: '0.3vw' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.2vw', height: '1.2vw' }}>
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          {conversation.likes}
        </div>
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cursor-pointer hover:text-[#00A4E4]" style={{ width: '1.2vw', height: '1.2vw' }}>
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function ConversationList({ title, conversations, showViewAll = false }) {
  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: '1.2vw', padding: '1.8vw', boxShadow: '0 0.2vw 1vw rgba(0,0,0,0.03)' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5vw' }}>
        <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: '1vw', lineHeight: '100%', letterSpacing: '0em', color: '#000' }}>
          {title}
        </h3>
        {showViewAll && (
          <button className="flex items-center text-gray-500 bg-white border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm" style={{ gap: '0.6vw', fontSize: '0.7vw', padding: '0.5vw 1.2vw', borderRadius: '2vw' }}>
            VIEW ALL
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '1vw', height: '1vw' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-col">
        {conversations.map((conv, index) => (
          <ConversationItem key={conv.id} conversation={conv} isFirst={index === 0} />
        ))}
      </div>
    </div>
  );
}
