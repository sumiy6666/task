import React from 'react';
import { Card } from '../ui/Card';
import styles from './UpdateList.module.css';

export function UpdateList() {
  const updates = [
    { title: 'New feature update', desc: 'Enhancements to the reporting module are now live' },
    { title: 'AV product roadmap webinar', desc: "Join us on June 12 at 4 to learn what's coming next" },
    { title: 'Community guidelines update', desc: "Join us on June 12 at 4 to learn what's coming next" },
    { title: 'New feature update', desc: 'Enhancements to the reporting module are now live' },
  ];

  return (
    <Card className={styles.updateCard}>
      <h3 className={styles.title}>FROM AV TEAM</h3>
      
      <div className={styles.list}>
        {updates.map((update, index) => (
          <div key={index} className={styles.listItem}>
            <div className={styles.itemContent}>
              <h4>{update.title}</h4>
              <p>{update.desc}</p>
            </div>
            <button className={styles.arrowBtn} aria-label="View details">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
