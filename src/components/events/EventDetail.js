import Link from 'next/link';
import { downloadIcs } from './RegisterEventModal';
import styles from './Events.module.css';

export default function EventDetail({ event, onRegister }) {
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
      href: '/members',
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
      href: '/discussions',
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
    <div className={`bg-white flex flex-col h-full overflow-hidden ${styles.panel}`}>
      {/* Header */}
      <div className={styles.detailHead}>
        <span className={`text-[#00A4E4] font-semibold uppercase ${styles.detailCategory}`}>
          {event.category}
        </span>

        <div className={`flex ${styles.detailIntro}`}>
          <div className="flex-1">
            <h2 className={`font-semibold text-[#132742] ${styles.detailTitle}`}>
              {event.title}
            </h2>
            <p className={`text-[#6b7280] ${styles.detailDesc}`}>
              {event.description}
            </p>
          </div>
          <div className={`flex-shrink-0 overflow-hidden ${styles.detailImage}`}>
            <img src={event.detailImage} alt={event.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Details table */}
      <div className={`flex flex-col ${styles.detailTable}`}>
        {details.map((detail, idx) => (
          <div key={idx} className={`flex items-start ${styles.detailRow}`}>
            <span className={`font-semibold text-[#132742] flex-shrink-0 ${styles.detailLabel}`}>
              {detail.label}
            </span>

            <div className={`flex-1 flex items-start ${styles.detailValueWrap}`}>
              {detail.avatar && (
                <img src={detail.avatar} alt="" className={`rounded-full flex-shrink-0 object-cover ${styles.detailAvatar}`} />
              )}
              <div className={`flex flex-col ${styles.detailValues}`}>
                <span className={`text-[#4b5563] whitespace-pre-line ${styles.detailValue}`}>
                  {detail.value}
                </span>
                {detail.subValue && (
                  <span className={`text-[#9ca3af] ${styles.detailSub}`}>{detail.subValue}</span>
                )}
              </div>
            </div>

            <div className="flex-shrink-0">
              {detail.actionIcon === 'button' ? (
                <button type="button" onClick={onRegister} className={`text-[#00A4E4] font-medium cursor-pointer hover:bg-[#00A4E4] hover:text-white transition-colors ${styles.detailRegister}`}>
                  {detail.action}
                </button>
              ) : detail.actionIcon === 'calendar' ? (
                <button type="button" onClick={() => downloadIcs(event)} className={`text-[#00A4E4] font-medium hover:underline flex items-center whitespace-nowrap cursor-pointer ${styles.detailLink}`}>
                  {detail.action}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              ) : (
                <Link href={detail.href || '#'} className={`text-[#00A4E4] font-medium hover:underline flex items-center whitespace-nowrap ${styles.detailLink}`}>
                  {detail.action}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
