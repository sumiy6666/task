import React from 'react';
import styles from './page.module.css';
import { HeroBanner } from '@/components/home/HeroBanner';
import { PollWidget } from '@/components/home/PollWidget';
import { QuickAccess } from '@/components/home/QuickAccess';
import { TrendingCard } from '@/components/home/TrendingCard';
import { CommunityPulse } from '@/components/home/CommunityPulse';
import { UpdateList } from '@/components/home/UpdateList';
import { ExploreCards } from '@/components/home/ExploreCards';

export default function Home() {
  return (
    <main className={`container ${styles.main}`}>
      <HeroBanner />

      {/* Row 1: Polls/QuickAccess + Trending */}
      <section className={styles.gridRow}>
        <div className={styles.colLeft}>
          <PollWidget />
          <QuickAccess />
        </div>
        <div className={styles.colRight}>
          <TrendingCard />
        </div>
      </section>

      {/* Row 2: CommunityPulse/Updates + ExploreCards */}
      <section className={styles.gridRow}>
        <div className={styles.colLeft2}>
          <CommunityPulse />
          <UpdateList />
        </div>
        <div className={styles.colRight2}>
          <ExploreCards />
        </div>
      </section>
    </main>
  );
}
