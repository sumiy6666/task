import { Reveal } from '@/components/ui/Reveal';
import EventCard from './EventCard';
import styles from './Events.module.css';

export default function UpcomingEventsList({ events, activeEventId, onEventSelect }) {
  return (
    <div className={`bg-white flex flex-col h-full overflow-hidden ${styles.panel}`}>
      {/* header */}
      <div className={styles.listHeader}>
        <Reveal as="h3" className={`text-[#111] uppercase ${styles.listTitle}`}>UPCOMING EVENTS</Reveal>
      </div>

      {/* list */}
      <Reveal stagger={120} className="flex flex-col flex-1 overflow-y-auto">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isActive={activeEventId === event.id}
            onClick={() => onEventSelect(event)}
          />
        ))}
      </Reveal>

      {/* view more */}
      <div className={styles.viewMore}>
        <a href="#" className={`text-[#aaa] uppercase hover:text-[#11A0DB] flex items-center ${styles.viewMoreLink}`}>
          VIEW MORE
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
