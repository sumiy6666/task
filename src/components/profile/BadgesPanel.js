import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { ProfileIcon } from './ProfileIcon';
import { EARNED_BADGES, UPCOMING_BADGES } from './sampleProfile';
import styles from './Profile.module.css';

// Badges tab: progress, earned badges, and badges still to earn.
export function BadgesPanel() {
  const earned = EARNED_BADGES.length;
  const total = earned + UPCOMING_BADGES.length;
  const percent = Math.round((earned / total) * 100);

  return (
    <section className={`${styles.card} ${styles.listPanel}`} aria-labelledby="badges-title">
      <div className={styles.badgesHead}>
        <div>
          <h2 id="badges-title" className={styles.panelTitle}>My Badges</h2>
          <p className={styles.badgesIntro}>Earn badges by participating, sharing knowledge and helping the community grow.</p>
        </div>
        <div className={styles.progressBox}>
          {earned} of {total} badges earned
          <div className={styles.progressRow}>
            <div className={styles.progressTrack} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Badges earned">
              <div className={styles.progressFill} style={{ width: `${percent}%` }} />
            </div>
            {percent}%
          </div>
        </div>
      </div>

      <div className={styles.badgeSection}>
        <h3 className={styles.badgeSectionTitle}>Earned Badges ({earned})</h3>
        <Reveal stagger={80} className={styles.badgeGrid}>
          {EARNED_BADGES.map((b) => (
            <div key={b.name} className={styles.badge}>
              <ProfileIcon name={b.icon} />
              <div className={styles.badgeName}>{b.name}</div>
              <div className={styles.badgeText}>{b.text}</div>
              <div className={styles.badgeText}>Earned on {b.earned}</div>
            </div>
          ))}
        </Reveal>
        <div className={styles.viewAllRow}>
          <Link href="/profile?tab=badges" className={styles.blueLink}>View all badges <ArrowRight strokeWidth={1.5} aria-hidden="true" /></Link>
        </div>
      </div>

      <div className={styles.badgeSection}>
        <h3 className={styles.badgeSectionTitle}>Upcoming Badges ({UPCOMING_BADGES.length})</h3>
        <Reveal stagger={80} className={styles.badgeGrid}>
          {UPCOMING_BADGES.map((b) => (
            <div key={b.name} className={styles.badge}>
              <ProfileIcon name={b.icon} />
              <div className={styles.badgeName}>{b.name}</div>
              <div className={styles.badgeText}>{b.text}</div>
              <div className={styles.badgeBar} role="progressbar" aria-valuenow={b.done} aria-valuemin={0} aria-valuemax={b.total} aria-label={`${b.name} progress`}>
                <span style={{ width: `${(b.done / b.total) * 100}%` }} />
              </div>
              <div className={styles.badgeCount}>{b.done}/{b.total}</div>
            </div>
          ))}
        </Reveal>
      </div>

      <div className={styles.keepGoing}>
        <ProfileIcon name="trophy" />
        <div>
          <div className={styles.keepGoingTitle}>Keep going!</div>
          <div className={styles.keepGoingText}>You&apos;re just a few steps away from your next badge.</div>
        </div>
        <Link href="/discussions" className={styles.explore}>EXPLORE OPPORTUNITIES <ArrowRight strokeWidth={1.5} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
