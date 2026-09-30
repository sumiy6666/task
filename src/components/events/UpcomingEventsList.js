import EventCard from './EventCard';

export default function UpcomingEventsList({ events, activeEventId, onEventSelect }) {
  return (
    <div className="bg-white flex flex-col h-full overflow-hidden" style={{ borderRadius: '1.2vw', boxShadow: '0 0.2vw 0.8vw rgba(0,0,0,0.06)' }}>
      {/* header */}
      <div style={{ padding: '2vw 2.5vw' }}>
        <h3 className="font-semibold text-[#132742] uppercase" style={{ fontSize: '0.85vw', letterSpacing: '0.1em' }}>UPCOMING EVENTS</h3>
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
      <div style={{ padding: '1.5vw 2.5vw', borderTop: '1px solid #e5e7eb' }}>
        <a href="#" className="text-[#6b7280] font-medium hover:text-[#132742] flex items-center" style={{ gap: '0.4vw', fontSize: '0.7vw' }}>
          VIEW MORE
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.8vw', height: '0.8vw' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
