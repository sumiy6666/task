import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import Link from 'next/link';

export function ConversationItem({ conversation, isFirst }) {
  return (
    <div className="flex max-sm:flex-wrap border-b border-gray-100 last:border-b-0" style={{ gap: 'calc(1.2 * var(--sa))', padding: 'calc(1.2 * var(--sa)) 0' }}>
      <img
        src={conversation.author.avatar}
        alt={conversation.author.name}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: 'calc(3.5 * var(--da) + var(--db))', height: 'calc(3.5 * var(--da) + var(--db))' }}
      />

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <Link href={typeof conversation.id === 'number' ? `/conversations/${conversation.id}` : '#'} className="no-underline">
          <h4 className={`${isFirst ? 'text-[#003ECF]' : 'text-gray-900'} leading-snug hover:text-[#00A4E4] transition-colors`} style={{ fontSize: 'calc(1.05 * var(--fa) + var(--fb))', fontWeight: 500, marginBottom: 'calc(0.4 * var(--sa))', maxWidth: '80%' }}>
            {conversation.title}
          </h4>
        </Link>

        <div className="text-gray-400 flex flex-wrap items-center" style={{ fontSize: 'calc(0.75 * var(--fa) + var(--fb))', gap: 'calc(0.5 * var(--sa))' }}>
          <span>{conversation.author.name}</span>
          <span>|</span>
          <span>{conversation.timeAgo} in {conversation.category}</span>
        </div>
      </div>

      <div className="flex items-center text-gray-400 max-sm:w-full max-sm:justify-end" style={{ gap: 'calc(1.2 * var(--sa))', fontSize: 'calc(0.9 * var(--fa) + var(--fb))' }}>
        {conversation.views && (
          <div className="flex items-center" style={{ gap: 'calc(0.3 * var(--sa))' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1.2 * var(--da) + var(--db))', height: 'calc(1.2 * var(--da) + var(--db))' }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {conversation.views}
          </div>
        )}
        <div className="flex items-center" style={{ gap: 'calc(0.3 * var(--sa))' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1.2 * var(--da) + var(--db))', height: 'calc(1.2 * var(--da) + var(--db))' }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {conversation.replies}
        </div>
        <div className="flex items-center" style={{ gap: 'calc(0.3 * var(--sa))' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1.2 * var(--da) + var(--db))', height: 'calc(1.2 * var(--da) + var(--db))' }}>
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          {conversation.likes}
        </div>
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cursor-pointer hover:text-[#00A4E4]" style={{ width: 'calc(1.2 * var(--da) + var(--db))', height: 'calc(1.2 * var(--da) + var(--db))' }}>
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function ConversationList({ title, conversations, showViewAll = false }) {
  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: 'calc(1.2 * var(--sa))', padding: 'calc(1.8 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(1 * var(--sa)) rgba(0,0,0,0.03)' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 'calc(1.5 * var(--sa))' }}>
        <Reveal as="h3" className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: 'calc(1 * var(--fa) + var(--fb))', lineHeight: '100%', letterSpacing: '0em', color: '#000' }}>
          {title}
        </Reveal>
        {showViewAll && (
          <button className="flex items-center text-gray-500 bg-white border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm" style={{ gap: 'calc(0.6 * var(--sa))', fontSize: 'calc(0.7 * var(--fa) + var(--fb))', padding: 'calc(0.5 * var(--sa)) calc(1.2 * var(--sa))', borderRadius: 'calc(2 * var(--sa))' }}>
            VIEW ALL
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 'calc(1 * var(--da) + var(--db))', height: 'calc(1 * var(--da) + var(--db))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      <Reveal stagger={120} className="flex flex-col">
        {conversations.map((conv, index) => (
          <ConversationItem key={conv.id} conversation={conv} isFirst={index === 0} />
        ))}
      </Reveal>
    </div>
  );
}
