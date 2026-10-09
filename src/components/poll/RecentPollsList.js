import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Poll.module.css';

// Outlined pill link with an arrow (VIEW, VIEW ALL, TAKE A POLL).
export function OutlineLink({ href, children }) {
  return (
    <Link href={href} className={styles.outlineBtn}>
      {children}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

export default function RecentPollsList({ polls, activePollId, onPollSelect }) {
  return (
    <>
      <div className={styles.panelHeader}>
        <Reveal as="h3" className={styles.panelTitle}>RECENT POLLS</Reveal>
      </div>

      <Reveal stagger={120} className="flex flex-col flex-1">
        {polls.map((poll) => (
          <div
            key={poll.id}
            onClick={() => onPollSelect(poll)}
            className={`${styles.recentRow} ${activePollId === poll.id ? styles.recentRowActive : ''}`}
          >
            <h4 className={styles.recentQuestion}>{poll.question}</h4>
            <div className={styles.meta}>
              {poll.category}
              <span className={styles.metaSep}>|</span>
              {poll.time}
            </div>
          </div>
        ))}
      </Reveal>

      <div className={styles.recentFooter}>
        <OutlineLink href="/poll/closed">VIEW</OutlineLink>
      </div>
    </>
  );
}
