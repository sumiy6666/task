import React from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { compactNumber } from '@/lib/discourse/format';
import styles from './CommunityPulse.module.css';

// Two digits, as in the design ("05"); larger numbers are shortened ("1.2K").
const show = (n, sample) => (n == null ? sample : n < 10 ? `0${n}` : compactNumber(n));

// `pulse` holds live forum counts; any missing number keeps its sample value.
export function CommunityPulse({ pulse }) {
  const stats = [
    { value: show(pulse?.contributors, '18'), label: 'Top Contributors', bg: '#3A97FF', href: '/members' },
    { value: show(pulse?.topics, '05'), label: 'Popular Topics', bg: '#1D79E0', href: '/discussions' },
    { value: show(pulse?.members, '1.2K'), label: 'Active Members', bg: '#003ECF', href: '/members' },
    { value: show(pulse?.announcements, '03'), label: 'Announcements', bg: '#5600CF', href: '/discussions' },
  ];

  return (
    <Card className={styles.pulseCard}>
      <h3 className={styles.title}>COMMUNITY PULSE</h3>
      
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Reveal key={index} delay={index * 150} className={styles.statCell}>
            <Link href={stat.href} className={styles.statItem} style={{ backgroundColor: stat.bg }}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Card>
  );
}
