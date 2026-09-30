import React from 'react';
import { Card } from '../ui/Card';
import styles from './CommunityPulse.module.css';

export function CommunityPulse() {
  const stats = [
    { value: '18', label: 'Top Contributors', bg: '#3A97FF' },
    { value: '05', label: 'Popular Topics', bg: '#1D79E0' },
    { value: '1.2K', label: 'Active Members', bg: '#003ECF' },
    { value: '03', label: 'Announcements', bg: '#5600CF' },
  ];

  return (
    <Card className={styles.pulseCard}>
      <h3 className={styles.title}>COMMUNITY PULSE</h3>
      
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statItem} style={{ backgroundColor: stat.bg }}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
