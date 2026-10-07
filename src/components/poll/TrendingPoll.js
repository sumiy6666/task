import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import styles from './Poll.module.css';

// Sample poll, shown when Discourse is not connected.
const SAMPLE = {
  question: 'When a family adds a new asset class, how long before it appears in consolidated reporting?',
  options: [
    { label: 'Same month', percentage: '18%', highlighted: false },
    { label: 'Within a quarter', percentage: '34%', highlighted: true },
    { label: 'Two quarters or more', percentage: '27%', highlighted: false },
    { label: 'It never fully does', percentage: '21%', highlighted: false },
  ],
};

export default function TrendingPoll({ poll }) {
  const shown = poll || SAMPLE;
  return (
    <PageHero
      image="/images/pollbanner.png"
      label="TRENDING POLL"
      title={shown.topicId ? <Link prefetch={false} href={`/conversations/${shown.topicId}`}>{shown.question}</Link> : shown.question}
      titleWidth="min(37.7vw, 490px)"
      arrows
    >
      <div className={styles.heroOptions}>
        {shown.options.map((opt, i) => (
          <div key={opt.id ?? opt.label} className={`rise-in cursor-pointer ${styles.heroOption}`} style={{ '--delay': `${0.3 + i * 0.12}s` }}>
            {opt.highlighted && <span className={styles.heroFill} style={opt.votes != null ? { width: opt.percentage } : undefined} aria-hidden="true" />}
            <span>{opt.label}</span>
            <span>{opt.percentage}</span>
          </div>
        ))}
      </div>
    </PageHero>
  );
}
