import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { FeaturePanel } from './FeaturePanel';
import styles from './About.module.css';

// "Knowledge about the AV Platform" photo card beside the tabbed photo panel.
// The heading, icon and arrow are part of the design's picture; the whole
// card links to the articles.
export function TwoSides() {
  return (
    <div className={styles.sides}>
      <Reveal>
        <Link href="/insights" className={styles.platformCard} aria-label="Knowledge about the AV Platform">
          <img src="/images/about-av-platform.jpg" alt="" />
        </Link>
      </Reveal>

      <Reveal delay={150}>
        <FeaturePanel />
      </Reveal>
    </div>
  );
}
