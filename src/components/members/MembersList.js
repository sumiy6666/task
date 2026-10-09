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
    <>
      {/* header */}
      <div className={styles.listHeader}>
        <Reveal as="h3" className={styles.listTitle}>MEMBERS</Reveal>
        <label className={styles.search}>
          <input
            type="search"
            placeholder="Search"
            aria-label="Search members"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </label>
      </div>

      {/* list */}
      <Reveal stagger={120} className={`flex flex-col ${styles.list}`}>
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

      {/* Pagination */}
      <nav className={styles.pagination} aria-label="Member pages">
        <button type="button" className={styles.page1} aria-current="page">1</button>
        <button type="button" className={styles.pageN}>2</button>
        <button type="button" className={styles.pageN}>3</button>
        <span aria-hidden="true">.........</span>
        <button type="button" className={styles.pageN}>42</button>
        <button type="button" className={styles.pageN} aria-label="Next page">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    </>
  );
}
