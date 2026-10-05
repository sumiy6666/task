import styles from './Events.module.css';

export default function EventCard({ event, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-start cursor-pointer transition-colors ${styles.card} ${isActive ? 'bg-[#f4f6f9]' : 'hover:bg-gray-50'}`}
    >
      {/* Thumbnail */}
      <div className={`flex-shrink-0 overflow-hidden ${styles.thumb}`}>
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>

      {/* Date block */}
      <div className={`flex-shrink-0 flex flex-col items-center ${styles.date}`}>
        <span className={`text-[#00A4E4] font-medium ${styles.month}`}>{event.month}</span>
        <span className={`font-bold text-[#132742] ${styles.day}`}>{event.day}</span>
        <span className={`text-[#9ca3af] font-medium uppercase ${styles.weekday}`}>{event.weekday}</span>
      </div>

      {/* Details */}
      <div className={`flex-1 flex flex-col ${styles.cardBody}`}>
        <h4 className={`font-medium text-[#132742] ${styles.cardTitle}`}>
          {event.title}
        </h4>
        <div className={`flex items-center text-[#6b7280] ${styles.cardMeta}`}>
          <div className={`flex items-center ${styles.cardMetaItem}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {event.time}
          </div>
          <div className={`flex items-center ${styles.cardMetaItem}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {event.joining} Joining
          </div>
        </div>
        <span className={`text-[#00A4E4] font-medium ${styles.cardCategory}`}>{event.category}</span>
      </div>
    </div>
  );
}
