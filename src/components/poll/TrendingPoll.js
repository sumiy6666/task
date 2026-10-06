import { PageHero } from '@/components/ui/PageHero';
import styles from './Poll.module.css';

const options = [
  { label: 'Same month', pct: '18%', active: false },
  { label: 'Within a quarter', pct: '34%', active: true },
  { label: 'Two quarters or more', pct: '27%', active: false },
  { label: 'It never fully does', pct: '21%', active: false }
];

export default function TrendingPoll() {
  return (
    <PageHero
      image="/images/pollbanner.png"
      label="TRENDING POLL"
      title="When a family adds a new asset class, how long before it appears in consolidated reporting?"
      titleWidth="min(37.7vw, 490px)"
      arrows
    >
      <div className={styles.heroOptions}>
        {options.map((opt, i) => (
          <div key={opt.label} className={`rise-in cursor-pointer ${styles.heroOption}`} style={{ '--delay': `${0.3 + i * 0.12}s` }}>
            {opt.active && <span className={styles.heroFill} aria-hidden="true" />}
            <span>{opt.label}</span>
            <span>{opt.pct}</span>
          </div>
        ))}
      </div>
    </PageHero>
  );
}
