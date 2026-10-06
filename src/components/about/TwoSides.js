import { BookOpen, Layers } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { FeaturePanel } from './FeaturePanel';
import styles from './About.module.css';

const topics = [
  'Accounting practices',
  'Reporting and reconciliation',
  'Compliance and regulatory perspectives',
  'Industry insights',
  'Expert articles and peer experience'
];

function Side({ Icon, name, sub, accent }) {
  return (
    <div className={styles.side}>
      <span className={styles.sideIcon}><Icon strokeWidth={1.4} aria-hidden="true" /></span>
      <div>
        <div className={`${styles.sideName} ${accent ? styles.sideNameAccent : ''}`}>{name}</div>
        <div className={styles.sideSub}>{sub}</div>
      </div>
    </div>
  );
}

// "Two sides of the community": the knowledge card beside the tabbed photo panel.
export function TwoSides() {
  return (
    <div className={styles.sides}>
      <Reveal as="section" className={`${styles.card} ${styles.sidesCard}`}>
        <h2 className={styles.sectionTitle}>Two sides of the community</h2>

        <Side Icon={BookOpen} name="Professional knowledge" sub="Beyond the platform" accent />
        <ul className={styles.sideList}>
          {topics.map((topic) => <li key={topic}>{topic}</li>)}
        </ul>

        <hr className={styles.rule} />
        <Side Icon={Layers} name="AV knowledge" sub="Inside the platform" />
        <hr className={styles.rule} />

        <p className={styles.together}>Together, they connect the thinking behind the work with the tools used to do it.</p>
      </Reveal>

      <Reveal delay={150}>
        <FeaturePanel />
      </Reveal>
    </div>
  );
}
