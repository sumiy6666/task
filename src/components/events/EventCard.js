export default function EventCard({ event, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-start cursor-pointer transition-colors ${isActive ? 'bg-[#f4f6f9]' : 'hover:bg-gray-50'}`}
      style={{ padding: '1.8vw 2vw', borderBottom: '1px solid #e5e7eb', gap: '1.5vw' }}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 overflow-hidden" style={{ width: '8vw', height: '5.5vw', borderRadius: '0.6vw' }}>
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>

      {/* Date block */}
      <div className="flex-shrink-0 flex flex-col items-center" style={{ width: '3.5vw' }}>
        <span className="text-[#00A4E4] font-medium" style={{ fontSize: '0.7vw' }}>{event.month}</span>
        <span className="font-bold text-[#132742]" style={{ fontSize: '1.8vw', lineHeight: '1' }}>{event.day}</span>
        <span className="text-[#9ca3af] font-medium uppercase" style={{ fontSize: '0.6vw' }}>{event.weekday}</span>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col" style={{ gap: '0.5vw' }}>
        <h4 className="font-medium text-[#132742]" style={{ fontSize: '0.85vw', lineHeight: '1.4' }}>
          {event.title}
        </h4>
        <div className="flex items-center text-[#6b7280]" style={{ gap: '1.2vw', fontSize: '0.7vw' }}>
          <div className="flex items-center" style={{ gap: '0.3vw' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.9vw', height: '0.9vw' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {event.time}
          </div>
          <div className="flex items-center" style={{ gap: '0.3vw' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.9vw', height: '0.9vw' }}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {event.joining} Joining
          </div>
        </div>
        <span className="text-[#00A4E4] font-medium" style={{ fontSize: '0.7vw' }}>{event.category}</span>
      </div>
    </div>
  );
}
