import React from 'react';
import { Card } from '../ui/Card';
import styles from './PollWidget.module.css';

export function PollWidget() {
  const pollData = [
    { label: 'Same month', percent: 46, color: 'var(--color-primary)' },
    { label: 'Within a quarter', percent: 28, color: 'var(--color-secondary-light)' },
    { label: 'Two quarters or more', percent: 16, color: 'var(--color-primary)' },
    { label: 'It never fully does', percent: 10, color: 'var(--color-secondary-light)' },
  ];

  return (
    <Card className={styles.pollCard}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <img src="/images/Icon3.svg" alt="Polls" style={{ width: '24px', height: '24px' }} />
        </div>
        <div className={styles.titleSection}>
          <span className={styles.tag}>POLLS</span>
          <h3>When a family adds a new asset class, how long before it appears in consolidated reporting?</h3>
        </div>
      </div>
      
      <div className={styles.pollResults}>
        {pollData.map((item, index) => (
          <div key={index} className={styles.pollBarWrapper}>
            <div className={styles.pollBarBg}>
              <div 
                className={styles.pollBarFill} 
                style={{ width: `${item.percent}%`, backgroundColor: item.color }}
              >
                <span className={styles.percentText}>{item.percent}%</span>
              </div>
            </div>
            <span className={styles.labelText}>{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
