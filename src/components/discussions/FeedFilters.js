import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Feed.module.css';

// One sidebar card of filter rows. The selected row is blue; pressing it
// again clears the filter.
function FilterCard({ id, title, rows, active, scroll, more }) {
  return (
    <Reveal as="nav" className={styles.categoriesCard} aria-labelledby={id}>
      <h2 id={id} className={styles.sideTitle}>{title}</h2>
      <ul className={`${styles.categoryList} ${scroll ? styles.scrollList : ''}`}>
        {rows.map((row) => {
          const isActive = active === row.key;
          return (
            <li key={row.key}>
              <Link
                href={isActive ? '/discussions' : row.href}
                scroll={false}
                className={`${styles.categoryRow} ${isActive ? styles.categoryActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{row.name}</span>
                <span>{row.count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {more && (
        <Link href={more.href} scroll={false} className={styles.moreLink}>
          {more.label}
        </Link>
      )}
    </Reveal>
  );
}

// "Filter": articles, insights (other conversations) and polls.
export function TypeFilter({ filters, active }) {
  const rows = filters.map((f) => ({ ...f, href: `/discussions?type=${f.key}` }));
  return <FilterCard id="filter-title" title="FILTER" rows={rows} active={active} />;
}

// Forum tags are lowercase; the list shows them with a capital first letter.
const capitalize = (name = '') => name.charAt(0).toUpperCase() + name.slice(1);

// How many topics show before "… and more".
const TOPIC_LIMIT = 6;

// "Topics": the forum's tags, most used first. The first few show with an
// "… and more" link (?topics=all) that opens the full, scrolling list. A
// selected topic always stays in view.
export function TopicFilter({ topics, active, showAll = false }) {
  if (!topics.length) return null;
  const extra = !showAll && topics.length > TOPIC_LIMIT;
  const shown = extra ? topics.slice(0, TOPIC_LIMIT) : topics;
  const selected = extra && topics.find((t) => t.slug === active && !shown.includes(t));
  const rows = (selected ? [...shown, selected] : shown).map((t) => ({
    key: t.slug,
    name: capitalize(t.name),
    count: t.count,
    href: `/discussions?tag=${encodeURIComponent(t.slug)}${showAll ? '&topics=all' : ''}`,
  }));
  const more = extra && {
    label: '… and more',
    href: active ? `/discussions?tag=${encodeURIComponent(active)}&topics=all` : '/discussions?topics=all',
  };
  return <FilterCard id="topics-title" title="TOPICS" rows={rows} active={active} scroll={showAll} more={more} />;
}
