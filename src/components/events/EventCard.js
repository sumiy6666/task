import styles from './Events.module.css';

export default function EventCard({ event, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-start cursor-pointer transition-colors ${styles.card} ${isActive ? styles.cardActive : 'hover:bg-[#f5f7f9]'}`}
    >
      {/* Thumbnail */}
      <div className={`flex-shrink-0 overflow-hidden ${styles.thumb}`}>
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>

      {/* Date block */}
      <div className={`flex-shrink-0 flex flex-col items-center ${styles.date}`}>
        <span className={`text-[#11A0DB] underline underline-offset-2 ${styles.month}`}>{event.month}</span>
        <span className={`text-[#111] ${styles.day}`}>{event.day}</span>
        <span className={`text-[#888] uppercase ${styles.weekday}`}>{event.weekday}</span>
      </div>

      {/* Details */}
      <div className={`flex-1 flex flex-col items-start ${styles.cardBody}`}>
        <h4 className={`text-[#111] ${styles.cardTitle}`}>
          {event.title}
        </h4>
        <div className={`flex items-center text-[#8a8a8a] ${styles.cardMeta}`}>
          <div className={`flex items-center ${styles.cardMetaItem}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {event.time}
          </div>
          <div className={`flex items-center ${styles.cardMetaItem}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {event.joining} Joining
          </div>
        </div>
        <span className={`text-[#11A0DB] ${styles.cardCategory}`}>{event.category}</span>
      </div>
    </div>
  );
}
