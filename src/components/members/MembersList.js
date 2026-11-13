'use client';
import { Reveal } from '@/components/ui/Reveal';
import { useState } from 'react';
import MemberCard from './MemberCard';
import styles from './Members.module.css';

const PER_PAGE = 5;

// Page numbers to show: the first, the last, and the pages around the
// current one, with "…" for the gaps.
function pageList(current, total) {
  const pages = [];
  for (let p = 1; p <= total; p += 1) {
    if (p === 1 || p === total || Math.abs(p - current) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return pages;
}

// The members, five to a page. The list is remounted (keyed) when the
// directory filters change, which starts it again at page 1.
export default function MembersList({ members, activeMemberId, onMemberSelect }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const term = query.trim().toLowerCase();
  const matching = term ? members.filter((m) => m.name.toLowerCase().includes(term)) : members;
  const totalPages = Math.max(1, Math.ceil(matching.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const visibleMembers = matching.slice((current - 1) * PER_PAGE, current * PER_PAGE);

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
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
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
            {term ? <>No members match &ldquo;{query}&rdquo;.</> : 'No members match these filters.'}
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
      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Member pages">
          {pageList(current, totalPages).map((p, i) => (p === '…' ? (
            <span key={`gap-${i}`} aria-hidden="true">.........</span>
          ) : (
            <button
              key={p}
              type="button"
              className={p === current ? styles.page1 : styles.pageN}
              aria-current={p === current ? 'page' : undefined}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          )))}
          <button
            type="button"
            className={styles.pageN}
            aria-label="Next page"
            disabled={current === totalPages}
            onClick={() => setPage(current + 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      )}
    </>
  );
}
