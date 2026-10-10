import React from 'react';
import styles from './page.module.css';
import { HeroBanner } from '@/components/home/HeroBanner';
import { DiscussionForum } from '@/components/home/DiscussionForum';
import { ResourcesCarousel } from '@/components/home/ResourcesCarousel';
import { PollWidget } from '@/components/home/PollWidget';
import { UpdateList } from '@/components/home/UpdateList';
import { CommunityPulse } from '@/components/home/CommunityPulse';
import { SAMPLE_EVENTS } from '@/components/events/sampleEvents';
import { loadHome, orderEvents, withUpcoming } from '@/lib/discourse/lists';

export default async function Home() {
  // Live forum data when Discourse is connected; each widget keeps its sample content otherwise.
  const live = await loadHome();

  return (
    <main className={`container ${styles.main}`}>
      <HeroBanner article={live?.hero.article} event={live?.hero.event || orderEvents(withUpcoming(SAMPLE_EVENTS))[0]} />
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
