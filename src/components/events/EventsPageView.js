'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import EventsHeroBanner from './EventsHeroBanner';
import UpcomingEventsList from './UpcomingEventsList';
import EventDetail from './EventDetail';
import CommunityBanner from './CommunityBanner';
import { RegisterEventModal } from './RegisterEventModal';
import { SAMPLE_EVENTS } from './sampleEvents';
import styles from './Events.module.css';

// The events page: hero carousel, the event list beside the open event, and
// the registration form.
export default function EventsPageView({ events = SAMPLE_EVENTS, heroSlides }) {
  const [activeEvent, setActiveEvent] = useState(events[0]);
  const [registering, setRegistering] = useState(null);

  const registerByTitle = (title) => setRegistering(events.find((e) => e.title === title) || events[0]);

  return (
    <div className={`container min-h-screen ${styles.page}`}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Events' }]} />

      <EventsHeroBanner slides={heroSlides} onRegister={registerByTitle} />

      {/* Upcoming Events + Event Detail side-by-side */}
      <div className={styles.columns}>
        <div className={styles.column}>
          <UpcomingEventsList
            events={events}
            activeEventId={activeEvent.id}
            onEventSelect={setActiveEvent}
          />
        </div>
        <div className={styles.column}>
          <EventDetail event={activeEvent} onRegister={() => setRegistering(activeEvent)} />
        </div>
      </div>

      <CommunityBanner />

      {registering && <RegisterEventModal key={registering.id} event={registering} onClose={() => setRegistering(null)} />}
    </div>
  );
}
