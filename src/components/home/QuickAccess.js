import React from 'react';
import { Card } from '../ui/Card';
import styles from './QuickAccess.module.css';

export function QuickAccess() {
  return (
    <Card variant="dark" className={styles.quickAccessCard}>
      <h3 className={styles.title}>QUICK ACCESS</h3>
      
      <div className={styles.actionsContainer}>
        <div className={styles.mainAction}>
          <button className={styles.actionBtn}>
            <img src="/images/QA.svg" alt="Quick Access" style={{ width: '24px', height: '24px' }} />
          </button>
          <span>View the Community</span>
        </div>
        
        <div className={styles.iconActions}>
          <button className={styles.smallActionBtn} aria-label="Action 1">
            <img src="/images/QA_icon1.png" alt="Action 1" style={{ width: '20px', height: '20px' }} />
          </button>
          <button className={styles.smallActionBtn} aria-label="Action 2">
            <img src="/images/QA_icon2.png" alt="Action 2" style={{ width: '20px', height: '20px' }} />
          </button>
          <button className={styles.smallActionBtn} aria-label="Action 3">
            <img src="/images/QA_icon3.png" alt="Action 3" style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      </div>
    </Card>
  );
}
