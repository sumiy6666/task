import { Reveal } from '@/components/ui/Reveal';
import styles from './Join.module.css';

const reasons = [
  'Talk to people who get your work, without explaining it from scratch.',
  'See how other family offices handle the questions sitting on your desk.',
  'Get first word on roundtables, meetups and sessions near you.',
  'Share your take in quick polls and see where your peers land.',
  'Pick up ideas you can actually use on Monday morning.',
  'Free to join.\nLeave anytime.',
];

// Who the community is for, beside six reasons to join.
export function WhyJoin() {
  return (
    <section className={styles.split}>
      <Reveal className={`${styles.panel} ${styles.story}`}>
        <h2 className={styles.storyTitle}>
          <span className={styles.storyAccent}>AV Community is where</span>
          those people find each other.
        </h2>
        <p className={styles.storyText}>
          It comes from Asset Vantage, which began inside a family office. A family that couldn&apos;t find a clear view of its
          own wealth built one, and other families started asking for it. The community starts from the same place: made by
          people who have sat where you sit, for the people sitting there now.
        </p>
        <p className={styles.storyText}>
          Swap notes with peers. Hear what&apos;s working elsewhere. See what&apos;s changing before it lands on your desk. No
          pitch. Just people who get it.
        </p>
      </Reveal>

      <Reveal delay={150} className={`${styles.panel} ${styles.why}`}>
        <h2 className={styles.sectionTitle}>Why you should join</h2>
        <Reveal stagger={100} className={styles.whyGrid}>
          {reasons.map((reason) => (
            <p key={reason} className={styles.whyTile} style={{ whiteSpace: 'pre-line' }}>{reason}</p>
          ))}
        </Reveal>
      </Reveal>
    </section>
  );
}
