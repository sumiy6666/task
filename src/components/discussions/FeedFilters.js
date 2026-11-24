import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Feed.module.css';

// The discussions URL for a type (Filter card) and a set of tags (Topics card).
// Both filters work together, so each link keeps the other one.
function hrefFor(type, tags) {
  const params = new URLSearchParams();
  if (type) params.set('type', type);
  if (tags.length) params.set('tag', tags.join(','));
  const query = params.toString();
  return query ? `/discussions?${query}` : '/discussions';
}

// One sidebar card of filter rows; selected rows are blue.
function FilterCard({ id, title, rows, scroll, action }) {
  return (
    <Reveal as="nav" className={styles.categoriesCard} aria-labelledby={id}>
      <div className={styles.sideTitleRow}>
        <h2 id={id} className={styles.sideTitle}>{title}</h2>
        {action}
      </div>
      <ul className={`${styles.categoryList} ${scroll ? styles.scrollList : ''}`}>
        {rows.map((row) => (
          <li key={row.key}>
            <Link
              href={row.href}
              scroll={false}
              className={`${styles.categoryRow} ${row.active ? styles.categoryActive : ''}`}
              aria-current={row.active ? 'true' : undefined}
            >
              <span className={styles.rowLabel}>
                {row.check && (
                  <span className={`${styles.check} ${row.active ? styles.checkOn : ''}`} aria-hidden="true">
                    {row.active && <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 6.2l2.3 2.3 4.7-4.9" /></svg>}
                  </span>
                )}
                {row.name}
              </span>
              <span>{row.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

// "Filter": All, articles, posts and polls. One at a time; chosen topics stay.
export function TypeFilter({ filters, type, tags = [] }) {
  const rows = filters.map((f) => {
    const isAll = f.key === 'all';
    const active = isAll ? !type : type === f.key;
    return { ...f, active, href: hrefFor(isAll || active ? null : f.key, tags) };
  });
  return <FilterCard id="filter-title" title="FILTER" rows={rows} />;
}

// Forum tags are lowercase; the list shows them with a capital first letter.
const capitalize = (name = '') => name.charAt(0).toUpperCase() + name.slice(1);

// "Topics": the forum's tags. Several can be chosen; chosen ones move to the
// top. Pressing a chosen one again removes it. Works together with the Filter card.
export function TopicFilter({ topics, type = null, tags = [] }) {
  if (!topics.length) return null;
  const chosen = new Set(tags);
  const ordered = [...topics.filter((t) => chosen.has(t.slug)), ...topics.filter((t) => !chosen.has(t.slug))];
  const rows = ordered.map((t) => {
    const active = chosen.has(t.slug);
    const next = active ? tags.filter((x) => x !== t.slug) : [...tags, t.slug];
    return { key: t.slug, name: capitalize(t.name), count: t.count, active, check: true, href: hrefFor(type, next) };
  });
  const clear = tags.length > 0 && (
    <Link href={hrefFor(type, [])} scroll={false} className={styles.clearTopics}>
      Clear ({tags.length})
    </Link>
  );
  return <FilterCard id="topics-title" title="TOPICS" rows={rows} scroll action={clear} />;
}
