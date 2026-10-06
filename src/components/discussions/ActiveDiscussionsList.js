import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Discussions.module.css';
import { ArrowIcon } from './icons';

export function ActiveDiscussionsList({ discussions }) {
  return (
    <div className={styles.card}>
      <Reveal as="h3" className={`${styles.cardTitle} ${styles.cardHeader}`}>RECENTLY ACTIVE DISCUSSIONS</Reveal>

      <Reveal stagger={120} className={styles.activeList}>
        {discussions.map((disc) => (
          <div key={disc.title} className={styles.activeRow}>
            <div className="min-w-0">
              <Link href="#" className={`block ${styles.activeTitle}`}>{disc.title}</Link>
              <div className={styles.activeMeta}>
                {disc.author}
                <span className={styles.metaSep}>|</span>
                {disc.timeAgo} in {disc.category}
              </div>
            </div>
            <Link href="#" className={styles.activeArrow} aria-label={`Open: ${disc.title}`}>
              <ArrowIcon />
            </Link>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
