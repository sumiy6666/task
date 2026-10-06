import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Poll.module.css';

export function ViewAllLink({ href }) {
  return (
    <Link href={href} className={styles.viewAll}>
      VIEW ALL
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

export default function RecentPollsList({ polls, activePollId, onPollSelect }) {
  return (
    <div className={`flex flex-col h-full overflow-hidden ${styles.panel}`}>
      <div className={styles.panelHeader}>
        <Reveal as="h3" className={styles.panelTitle}>RECENT POLLS</Reveal>
        <ViewAllLink href="/poll/closed" />
      </div>

      <Reveal stagger={120} className="flex flex-col flex-1" style={{ paddingBottom: 16 }}>
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
    </div>
  );
}
