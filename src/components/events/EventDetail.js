export default function EventDetail({ event }) {
  if (!event) return null;

  const details = [
    {
      label: 'Date/Time',
      value: `${event.fullDate}\n${event.time}`,
      action: 'Add to Calendar',
      actionIcon: 'calendar'
    },
    {
      label: 'Speaker',
      value: event.speaker,
      subValue: event.speakerRole,
      avatar: event.speakerAvatar,
      action: 'View Profile',
      actionIcon: 'arrow'
    },
    {
      label: 'Agenda',
      value: event.agenda,
      action: 'View Agenda',
      actionIcon: 'arrow'
    },
    {
      label: 'Registration',
      value: event.registration,
      action: 'Register Now',
      actionIcon: 'button'
    },
    {
      label: 'Related\nDiscussion',
      value: 'Join the conversation with community members.',
      action: 'View Discussions',
      actionIcon: 'arrow'
    },
    {
      label: 'Post-event\nresources',
      value: 'Slides, reading materials and reference links.',
      action: 'View resources',
      actionIcon: 'arrow'
    },
    {
      label: 'Recording',
      value: 'Recording will be available after the events.',
      action: 'Available after event',
      actionIcon: 'arrow'
    }
  ];

  return (
    <div className="bg-white flex flex-col h-full overflow-hidden" style={{ borderRadius: '1.2vw', boxShadow: '0 0.2vw 0.8vw rgba(0,0,0,0.06)' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#f0f4f8', padding: '2.5vw 3vw', borderBottom: '1px solid #e5e7eb' }}>
        <span className="text-[#00A4E4] font-semibold uppercase" style={{ fontSize: '0.75vw', letterSpacing: '0.1em', marginBottom: '1.2vw', display: 'block' }}>
        {event.category}
      </span>

      <div className="flex" style={{ gap: '2vw', marginBottom: '2vw' }}>
        <div className="flex-1">
          <h2 className="font-semibold text-[#132742]" style={{ fontSize: '1.1vw', lineHeight: '1.4', marginBottom: '1vw' }}>
            {event.title}
          </h2>
          <p className="text-[#6b7280]" style={{ fontSize: '0.75vw', lineHeight: '1.6' }}>
            {event.description}
          </p>
        </div>
        <div className="flex-shrink-0 overflow-hidden" style={{ width: '8vw', height: '6vw', borderRadius: '0.6vw' }}>
          <img src={event.detailImage} alt={event.title} className="w-full h-full object-cover" />
        </div>
        </div>
      </div>

      {/* Details table */}
      <div className="flex flex-col" style={{ padding: '0 3vw 2.5vw' }}>
        {details.map((detail, idx) => (
          <div
            key={idx}
            className="flex items-start"
            style={{ padding: '1.5vw 0', borderTop: '1px solid #e5e7eb', gap: '2vw' }}
          >
            <span className="font-semibold text-[#132742] flex-shrink-0 whitespace-pre-line" style={{ fontSize: '0.75vw', width: '7vw' }}>
              {detail.label}
            </span>

            <div className="flex-1 flex items-start" style={{ gap: '1vw' }}>
              {detail.avatar && (
                <img src={detail.avatar} alt="" className="rounded-full flex-shrink-0 object-cover" style={{ width: '2.5vw', height: '2.5vw' }} />
              )}
              <div className="flex flex-col" style={{ gap: '0.2vw' }}>
                <span className="text-[#4b5563] whitespace-pre-line" style={{ fontSize: '0.75vw', lineHeight: '1.5' }}>
                  {detail.value}
                </span>
                {detail.subValue && (
                  <span className="text-[#9ca3af]" style={{ fontSize: '0.7vw' }}>{detail.subValue}</span>
                )}
              </div>
            </div>

            <div className="flex-shrink-0">
              {detail.actionIcon === 'button' ? (
                <button className="text-[#00A4E4] font-medium cursor-pointer hover:bg-[#00A4E4] hover:text-white transition-colors" style={{ fontSize: '0.65vw', padding: '0.4vw 1.2vw', border: '1px solid #00A4E4', borderRadius: '2vw', background: 'none' }}>
                  {detail.action}
                </button>
              ) : (
                <a href="#" className="text-[#00A4E4] font-medium hover:underline flex items-center whitespace-nowrap" style={{ gap: '0.3vw', fontSize: '0.7vw' }}>
                  {detail.action}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.7vw', height: '0.7vw' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
