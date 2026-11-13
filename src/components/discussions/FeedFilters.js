import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Feed.module.css';

// One sidebar card of filter rows. The selected row is blue; pressing it
// again clears the filter.
function FilterCard({ id, title, rows, active, scroll }) {
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
    </Reveal>
  );
}

// "Filter": articles, insights (other conversations) and polls.
export function TypeFilter({ filters, active }) {
  const rows = filters.map((f) => ({ ...f, href: `/discussions?type=${f.key}` }));
  return <FilterCard id="filter-title" title="FILTER" rows={rows} active={active} />;
}

// "Topics": the forum's tags, most used first, in a scrolling list.
export function TopicFilter({ topics, active }) {
  if (!topics.length) return null;
  const rows = topics.map((t) => ({ key: t.slug, name: t.name, count: t.count, href: `/discussions?tag=${encodeURIComponent(t.slug)}` }));
  return <FilterCard id="topics-title" title="TOPICS" rows={rows} active={active} scroll />;
}
