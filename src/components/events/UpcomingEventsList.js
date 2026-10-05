import EventCard from './EventCard';
import styles from './Events.module.css';

export default function UpcomingEventsList({ events, activeEventId, onEventSelect }) {
  return (
    <div className={`bg-white flex flex-col h-full overflow-hidden ${styles.panel}`}>
      {/* header */}
      <div className={styles.listHeader}>
        <h3 className={`font-semibold text-[#132742] uppercase ${styles.listTitle}`}>UPCOMING EVENTS</h3>
      </div>

      {/* list */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isActive={activeEventId === event.id}
            onClick={() => onEventSelect(event)}
          />
        ))}
      </div>

      {/* view more */}
      <div className={styles.viewMore}>
        <a href="#" className={`text-[#6b7280] font-medium hover:text-[#132742] flex items-center ${styles.viewMoreLink}`}>
          VIEW MORE
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
