import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import styles from './ExpertPerspectives.module.css';

export function ExpertPerspectiveCard({ expert }) {
  return (
    <div className={styles.card} style={{ background: expert.color || '#003ECF' }}>
      <div className={styles.head}>
        <img src={expert.avatar} alt={expert.name} className={styles.avatar} />
        <div className="min-w-0">
          <div className={styles.name}>{expert.name}</div>
          <div className={styles.contributions}>{expert.contributions} contributions</div>
        </div>
      </div>

      <h3 className={styles.cardTitle}>{expert.title}</h3>

      <Link href="#" className={styles.readMore}>
        READ MORE
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </div>
  );
}

// The full-width Expert Perspectives section; cards fade up one by one.
export function ExpertPerspectives({ experts }) {
  return (
    <section className={styles.section}>
      <Reveal as="h3" className={`uppercase ${styles.title}`}>EXPERT PERSPECTIVES</Reveal>
      <Reveal stagger={150} delay={150} className={styles.grid}>
        {experts.map((expert) => (
          <div key={expert.id} className="flex">
            <ExpertPerspectiveCard expert={expert} />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
