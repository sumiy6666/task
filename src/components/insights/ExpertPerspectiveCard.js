import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import styles from './ExpertPerspectives.module.css';

export function ExpertPerspectiveCard({ expert }) {
  return (
    <div className={styles.card} style={{ background: expert.color || '#003ECF' }}>
      <div className={styles.head}>
        <img src={expert.avatar} alt="" className={styles.avatar} />
        <div className="min-w-0">
          <div className={styles.name}>{expert.name}</div>
          <div className={styles.contributions}>{expert.contributions} contributions</div>
        </div>
      </div>

      {expert.title && <h3 className={styles.cardTitle}>{expert.title}</h3>}

      <Link href={expert.href || '#'} className={styles.arrow} aria-label={`Read ${expert.name}'s perspective`}>
        <ArrowRight size={14} strokeWidth={1.5} />
      </Link>
    </div>
  );
}

// The Expert Perspectives section; cards fade up one by one.
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
