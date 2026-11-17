import { Hourglass, Mail } from 'lucide-react';
import styles from './Join.module.css';

const ICONS = { review: Hourglass, approved: Mail };

// A four-pointed sparkle beside the icon circle.
function Sparkle({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.6 6.4 5 11 12 12-7 1-11.4 5.6-12 12-.6-6.4-5-11-12-12 7-1 11.4-5.6 12-12z" />
    </svg>
  );
}

// The blue card that takes the photo banner's place on the Join page: after
// the form is sent ("review"), and when an approved member arrives from their
// email ("approved"). `action` is an optional { label, href } button.
export function JoinStatus({ kind = 'review', title, lines = [], action }) {
  const Icon = ICONS[kind] || Hourglass;
  return (
    <section className={styles.status} role="status">
      <div className={`${styles.statusArt} rise-in`}>
        <span className={styles.statusCircle}>
          <Icon className={styles.statusIcon} strokeWidth={1.1} aria-hidden="true" />
        </span>
        <Sparkle className={`${styles.sparkle} ${styles.sparkleBig}`} />
        <Sparkle className={`${styles.sparkle} ${styles.sparkleSmall}`} />
        <Sparkle className={`${styles.sparkle} ${styles.sparkleLow}`} />
      </div>
      <h1 className={`${styles.statusTitle} rise-in`} style={{ '--delay': '0.15s' }}>{title}</h1>
      <p className={`${styles.statusText} rise-in`} style={{ '--delay': '0.3s' }}>
        {lines.map((line, i) => <span key={i}>{line}</span>)}
      </p>
      {action && (
        <a href={action.href} className={`${styles.statusButton} rise-in`} style={{ '--delay': '0.45s' }}>
          {action.label}
        </a>
      )}
    </section>
  );
}
