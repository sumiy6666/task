'use client';
import { Reveal } from '@/components/ui/Reveal';
import { useState } from 'react';
import MemberCard from './MemberCard';
import styles from './Members.module.css';

export default function MembersList({ members, activeMemberId, onMemberSelect }) {
  const [query, setQuery] = useState('');
  const term = query.trim().toLowerCase();
  const visibleMembers = term ? members.filter((m) => m.name.toLowerCase().includes(term)) : members;

  return (
    <div className={`flex flex-col h-full overflow-hidden ${styles.panel}`}>
      {/* header */}
      <div className={`flex justify-between items-center ${styles.listHeader}`}>
        <Reveal as="h3" className={`uppercase ${styles.listTitle}`}>MEMBERS</Reveal>
        <label className="relative flex items-center bg-white" style={{ width: 'calc(8.5 * var(--da) + var(--db))', borderRadius: '999px', boxShadow: '0 calc(0.2 * var(--sa)) calc(0.8 * var(--sa)) rgba(0,0,0,0.1)' }}>
          <input
            type="search"
            placeholder="Search"
            aria-label="Search members"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[#0033cc] placeholder:text-[#0033cc] outline-none"
            style={{ fontSize: 'calc(0.65 * var(--fa) + var(--fb))', padding: 'calc(0.5 * var(--sa)) calc(2.4 * var(--sa)) calc(0.5 * var(--sa)) calc(1.2 * var(--sa))', border: 'none' }}
          />
          <svg viewBox="0 0 24 24" fill="none" stroke="#00A4E4" strokeWidth="2" className="absolute pointer-events-none" style={{ right: 'calc(0.9 * var(--sa))', width: 'calc(0.95 * var(--da) + var(--db))', height: 'calc(0.95 * var(--da) + var(--db))' }}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </label>
      </div>

      {/* list */}
      <Reveal stagger={120} className={`flex flex-col flex-1 overflow-y-auto ${styles.list}`}>
        {visibleMembers.length === 0 && (
          <p className={styles.empty}>
            No members match &ldquo;{query}&rdquo;.
          </p>
        )}
        {visibleMembers.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            isActive={activeMemberId === member.id}
            onClick={() => onMemberSelect(member)}
          />
        ))}
      </Reveal>

      {/* footer */}
      <div className="flex justify-end items-center" style={{ padding: 'calc(1.2 * var(--sa)) calc(3 * var(--sa)) calc(2 * var(--sa))' }}>
        {/* Pagination */}
        <div className="flex items-center" style={{ gap: 'calc(0.4 * var(--sa))' }}>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`flex items-center justify-center cursor-pointer ${n === 1 ? 'text-white' : 'text-[#11A0DB] hover:underline'}`}
              style={{
                width: 'calc(1.8 * var(--da) + var(--db))',
                height: 'calc(1.8 * var(--da) + var(--db))',
                borderRadius: '50%',
                fontSize: 'calc(0.7 * var(--fa) + var(--fb))',
                border: 'none',
                backgroundColor: n === 1 ? '#11A0DB' : 'transparent'
              }}
            >
              {n}
            </button>
          ))}
          <span className="text-[#11A0DB]" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))' }}>.......</span>
          <button className="flex items-center justify-center cursor-pointer text-[#11A0DB] hover:underline bg-transparent" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))', border: 'none' }}>
            42
          </button>
          <button className="flex items-center justify-center cursor-pointer text-[#00A4E4] hover:text-[#0088be] bg-transparent" style={{ border: 'none' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(0.9 * var(--da) + var(--db))', height: 'calc(0.9 * var(--da) + var(--db))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
