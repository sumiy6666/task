import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { ProfileIcon } from './ProfileIcon';
import { GLANCE } from './sampleProfile';
import styles from './Profile.module.css';

// Summary tab: "At a glance" numbers and the member's top two badges. A forum
// profile passes its own `glance` and `topBadges`.
export function SummaryPanel({ glance = GLANCE, topBadges = null, onShowBadges }) {
  return (
    <>
      <section className={`${styles.card} ${styles.glance}`} aria-labelledby="glance-title">
        <h2 id="glance-title" className={styles.glanceTitle}>At a glance</h2>
        <Reveal stagger={80} className={styles.glanceGrid}>
          {glance.map((stat) => (
            <div key={stat.label} className={styles.glanceItem}>
              <ProfileIcon name={stat.icon} />
              <div className={styles.glanceValue}>{stat.value}</div>
              <div className={styles.glanceLabel}>{stat.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      <section className={`${styles.card} ${styles.topBadges}`} aria-labelledby="top-badges-title">
        <div className={styles.topBadgesHead}>
          <h2 id="top-badges-title" className={styles.badgesTitle}>Top Badges</h2>
          <button type="button" className={styles.blueLink} onClick={onShowBadges}>
            View all badges <ArrowRight strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        {topBadges ? (
          <Reveal stagger={120} className={styles.badgeCards}>
            {topBadges.length > 0 ? (
              topBadges.map((b) => (
                <div key={b.id} className={styles.badgeCard}>
                  <ProfileIcon name={b.icon} />
                  <div>
                    <div className={styles.badgeCardTitle}>{b.name}</div>
                    <div className={styles.badgeCardText}>{b.text}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.badgeCard}>
                <ProfileIcon name="star" />
                <div>
                  <div className={styles.badgeCardTitle}>No badges yet</div>
                  <div className={styles.badgeCardText}>
                    Read the <Link href="/guidelines">Community guidelines</Link> and join a discussion to earn your first.
                  </div>
                </div>
              </div>
            )}
          </Reveal>
        ) : (
        <Reveal stagger={120} className={styles.badgeCards}>
          <div className={styles.badgeCard}>
            <ProfileIcon name="eye" />
            <div>
              <div className={styles.badgeCardTitle}>Enthusiast</div>
              <div className={styles.badgeCardText}>Visited 10 consecutive days</div>
            </div>
          </div>
          <div className={styles.badgeCard}>
            <ProfileIcon name="file" />
            <div>
              <div className={styles.badgeCardTitle}>Read Guidelines</div>
              <div className={styles.badgeCardText}>
                Read the <Link href="/guidelines">Community guidelines</Link>
              </div>
            </div>
          </div>
        </Reveal>
        )}
      </section>
    </>
  );
}
