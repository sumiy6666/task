import React from 'react';
import styles from './page.module.css';
import { HeroBanner } from '@/components/home/HeroBanner';
import { DiscussionForum } from '@/components/home/DiscussionForum';
import { ResourcesCarousel } from '@/components/home/ResourcesCarousel';
import { PollWidget } from '@/components/home/PollWidget';
import { UpdateList } from '@/components/home/UpdateList';
import { CommunityPulse } from '@/components/home/CommunityPulse';
import { loadHome } from '@/lib/discourse/lists';

export default async function Home() {
  // Live forum data when Discourse is connected; each widget keeps its sample content otherwise.
  const live = await loadHome();

  return (
    <main className={`container ${styles.main}`}>
      <HeroBanner />
      <DiscussionForum topics={live?.forum} />
      <ResourcesCarousel resources={live?.resources} />

      {/* Poll + News */}
      <section className={styles.gridRow}>
        <div className={styles.colPoll}>
          <PollWidget poll={live?.poll} />
        </div>
        <div className={styles.colNews}>
          <UpdateList updates={live?.updates} />
        </div>
      </section>

      <CommunityPulse pulse={live?.pulse} />
    </main>
  );
}
