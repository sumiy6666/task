import React from 'react';
import Link from 'next/link';
import { ArrowRight, CircleArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import styles from './UpdateList.module.css';

const SAMPLE_UPDATES = [
  { title: 'Community guidelines update', desc: "Join us on June 12 at 4 to learn what's coming next", href: '/guidelines' },
  { title: 'New feature update', desc: 'Enhancements to the reporting module are now live', href: '/discussions' },
  { title: 'AV product roadmap webinar', desc: "Join us on June 12 at 4 to learn what's coming next", href: '/events' },
  { title: 'New product feature', desc: "Join us on June 12 at 4 to learn what's coming next", href: '/discussions' },
];

// `updates` are the forum's pinned and staff-written topics. The first one
// is featured; up to three more are listed beside it.
export function UpdateList({ updates: live }) {
  const [featured, ...rest] = live?.length ? live : SAMPLE_UPDATES;
  const others = rest.slice(0, 3);

  return (
    <Card className={styles.updateCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>NEWS</h2>
        <Button href="/discussions" variant="outlineDark" size="sm" icon={<ArrowRight size={14} />} iconPosition="right" className={styles.exploreBtn}>
          EXPLORE
        </Button>
      </div>

      <div className={styles.body}>
        <Reveal className={styles.featuredCell}>
          <Link prefetch={false} href={featured.href} className={styles.featured}>
            <h3>{featured.title}</h3>
            <p>{featured.desc}</p>
            <span className={styles.featuredArrow} aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </Link>
        </Reveal>

        {others.length > 0 && (
          <Reveal delay={150} className={styles.list}>
            {others.map((update, index) => (
              <Link key={index} prefetch={false} href={update.href} className={styles.listItem}>
                <div className={styles.itemContent}>
                  <h4>{update.title}</h4>
                  <p>{update.desc}</p>
                </div>
                <CircleArrowRight size={28} strokeWidth={1.25} className={styles.arrowIcon} aria-hidden="true" />
              </Link>
            ))}
          </Reveal>
        )}
      </div>
    </Card>
  );
}
