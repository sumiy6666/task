import { Reveal } from '@/components/ui/Reveal';
import { downloadIcs } from './RegisterEventModal';
import styles from './Events.module.css';

export default function EventDetail({ event, onRegister }) {
  if (!event) return null;

  const details = [
    { label: 'Date/Time', value: `${event.fullDate}\n${event.time}`, calendar: true },
    { label: 'Speaker', value: event.speaker, subValue: event.speakerRole, avatar: event.speakerAvatar },
    { label: 'Agenda', value: event.agenda },
    { label: 'Registration', value: event.registration },
    { label: 'Related\nDiscussion', value: 'Join the conversation with community members.' },
    { label: 'Post-event\nresources', value: 'Slides, reading materials and reference links.' },
    { label: 'Recording', value: 'Recording will be available after the events.' }
  ];

  return (
    <div className={`flex flex-col ${styles.panel}`}>
      {/* Header */}
      <Reveal className={styles.detailHead}>
        <span className={`text-[#11A0DB] uppercase ${styles.detailCategory}`}>
          {event.category}
        </span>

        <div className={`flex ${styles.detailIntro}`}>
          <div className="flex-1">
            <h2 className={`text-[#111] ${styles.detailTitle}`}>
              {event.title}
            </h2>
            <p className={styles.detailDesc}>
              {event.description}
            </p>
          </div>
          <div className={`flex-shrink-0 overflow-hidden ${styles.detailImage}`}>
            <img src={event.detailImage} alt={event.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </Reveal>

      {/* Details table */}
      <Reveal stagger={100} delay={200} className={`flex flex-col ${styles.detailTable}`}>
        {details.map((detail) => (
          <div key={detail.label} className={`flex items-start ${styles.detailRow}`}>
            <span className={`text-[#111] flex-shrink-0 ${styles.detailLabel}`}>
              {detail.label}
            </span>

            <div className={`flex-1 flex items-start ${styles.detailValueWrap}`}>
              {detail.avatar && (
                <img src={detail.avatar} alt="" className={`rounded-full flex-shrink-0 object-cover ${styles.detailAvatar}`} />
              )}
              <div className={`flex flex-col ${styles.detailValues}`}>
                <span className={`text-[#666] whitespace-pre-line ${styles.detailValue} ${detail.subValue ? styles.detailName : ''}`}>
                  {detail.value}
                </span>
                {detail.subValue && (
                  <span className={`text-[#777] whitespace-pre-line ${styles.detailValue} ${styles.detailSub}`}>{detail.subValue}</span>
                )}
              </div>
            </div>

            {detail.calendar && (
              <button type="button" onClick={() => downloadIcs(event)} className={`text-[#11A0DB] hover:underline flex cursor-pointer ${styles.calendarLink}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
                </svg>
                Add to Calendar
              </button>
            )}
          </div>
        ))}
      </Reveal>

      <div>
        <button type="button" onClick={onRegister} className={`cursor-pointer ${styles.detailRegister}`}>
          REGISTER
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
