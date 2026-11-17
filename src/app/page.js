import React from 'react';
import styles from './page.module.css';
import { HeroBanner } from '@/components/home/HeroBanner';
import { OfferCards } from '@/components/about/OfferCards';
import { ResourcesCarousel } from '@/components/home/ResourcesCarousel';
import { PollWidget } from '@/components/home/PollWidget';
import { UpdateList } from '@/components/home/UpdateList';
import { AboutBanner } from '@/components/about/AboutBanner';
import { SAMPLE_EVENTS } from '@/components/events/sampleEvents';
import { loadHome, orderEvents, withUpcoming } from '@/lib/discourse/lists';

export default async function Home() {
  // Live forum data when Discourse is connected; each widget keeps its sample content otherwise.
  const live = await loadHome();

  return (
    <main className={`container ${styles.main}`}>
      {/* The About Us banner shows in place of the article/event slides for now. */}
      <HeroBanner
        article={live?.hero.article}
        event={live?.hero.event || orderEvents(withUpcoming(SAMPLE_EVENTS))[0]}
        banner={<AboutBanner />}
      />
      {/* "What you can do here": the same cards as on the About page. */}
      <div className={styles.offers}>
        <OfferCards />
      </div>
      <ResourcesCarousel />

      {/* Poll + News */}
      <section className={styles.gridRow}>
        <div className={styles.colPoll}>
          <PollWidget poll={live?.poll} />
        </div>
        <div className={styles.colNews}>
          <UpdateList updates={live?.updates} />
        </div>
      </section>
    </main>
  );
}
