import React from 'react';
import styles from './page.module.css';
import { HeroBanner } from '@/components/home/HeroBanner';
import { PollWidget } from '@/components/home/PollWidget';
import { QuickAccess } from '@/components/home/QuickAccess';
import { TrendingCard } from '@/components/home/TrendingCard';
import { CommunityPulse } from '@/components/home/CommunityPulse';
import { UpdateList } from '@/components/home/UpdateList';
import { ExploreCards } from '@/components/home/ExploreCards';
import { loadHome } from '@/lib/discourse/lists';

export default async function Home() {
  // Live forum data when Discourse is connected; each widget keeps its sample content otherwise.
  const live = await loadHome();

  return (
    <main className={`container ${styles.main}`}>
      <HeroBanner />

      {/* Row 1: Polls/QuickAccess + Trending */}
      <section className={styles.gridRow}>
        <div className={styles.colLeft}>
          <PollWidget poll={live?.poll} />
          <QuickAccess />
        </div>
        <div className={styles.colRight}>
          <TrendingCard slides={live?.trending} />
        </div>
      </section>

      {/* Row 2: CommunityPulse/Updates + ExploreCards */}
      <section className={styles.gridRow}>
        <div className={styles.colLeft2}>
          <CommunityPulse pulse={live?.pulse} />
          <UpdateList updates={live?.updates} />
        </div>
        <div className={styles.colRight2}>
          <ExploreCards />
        </div>
      </section>
    </main>
  );
}
