import React from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import styles from './QuickAccess.module.css';

export function QuickAccess() {
  return (
    <Card variant="dark" className={styles.quickAccessCard}>
      <h3 className={styles.title}>QUICK ACCESS</h3>
      
      <div className={styles.actionsContainer}>
        <div className={styles.mainAction}>
          <Link href="/discussions" className={styles.actionBtn} aria-label="View the Community">
            <img src="/images/QA.svg" alt="" style={{ width: '24px', height: '24px' }} />
          </Link>
          <Link href="/discussions">View the Community</Link>
        </div>
        
        <div className={styles.iconActions}>
          <Link href="/events" className={styles.smallActionBtn} aria-label="Events" title="Events">
            <img src="/images/QA_icon1.png" alt="" style={{ width: '20px', height: '20px' }} />
          </Link>
          <Link href="/insights" className={styles.smallActionBtn} aria-label="Insights" title="Insights">
            <img src="/images/QA_icon2.png" alt="" style={{ width: '20px', height: '20px' }} />
          </Link>
          <Link href="/conversations/new" className={styles.smallActionBtn} aria-label="Start a conversation" title="Start a conversation">
            <img src="/images/QA_icon3.png" alt="" style={{ width: '20px', height: '20px' }} />
          </Link>
        </div>
      </div>
    </Card>
  );
}
