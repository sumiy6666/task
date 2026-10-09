'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import styles from './RegisterEvent.module.css';
import { CloseIcon } from '../compose/icons';

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' };

const CalendarIcon = () => (
  <svg viewBox="0 0 18 18" {...line}><rect x="2" y="3" width="14" height="13" rx="2" /><path d="M2 7h14M6 1.5v3M12 1.5v3M6.5 11l1.8 1.8L11.5 9.5" /></svg>
);

const BENEFITS = [
  {
    title: 'Learn from experts',
    text: 'Practical insights from industry leaders.',
    icon: <svg viewBox="0 0 48 48" {...line}><circle cx="11" cy="31" r="7" /><circle cx="37" cy="31" r="7" /><path d="M18 31c2-2 10-2 12 0M4 31l3-15h4M44 31l-3-15h-4" /></svg>,
  },
  {
    title: 'Be a part of the conversation',
    text: 'Engage with peers and ask questions',
    icon: <svg viewBox="0 0 48 48" {...line}><path d="M5 9h38v24H20l-9 8v-8H5z" /><path d="M16 21h.01M24 21h.01M32 21h.01" strokeWidth="2.5" /></svg>,
  },
  {
    title: 'Access Resources',
    text: 'Get slides, recordings and key takeaways.',
    icon: <svg viewBox="0 0 48 48" {...line}><rect x="6" y="8" width="36" height="24" rx="3" /><path d="M16 26v-4M24 26v-8M32 26v-6M18 32l-5 9M30 32l5 9M24 32v4" /></svg>,
  },
  {
    title: 'Send me events reminders and updates',
    icon: <svg viewBox="0 0 48 48" {...line}><path d="M14 33V21a10 10 0 0 1 20 0v12l3 4H11zM21 41a3 3 0 0 0 6 0M24 8V6" /></svg>,
  },
];

// Inline because the CSS build drops backdrop-filter from the module stylesheet.
const BACKDROP_BLUR = { backdropFilter: 'blur(9px)', WebkitBackdropFilter: 'blur(9px)' };

function toIcsDate(date) {
  return new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function downloadIcs(event) {
  const escape = (s) => String(s || '').replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AV Community//Events//EN',
    'BEGIN:VEVENT',
    `UID:av-event-${event.id}@av-community`,
    `DTSTAMP:${toIcsDate(Date.now())}`,
    `DTSTART:${toIcsDate(event.startsAt)}`,
    `DTEND:${toIcsDate(event.endsAt)}`,
    `SUMMARY:${escape(event.title)}`,
    `DESCRIPTION:${escape(event.description)}`,
    `LOCATION:${escape(event.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.title.replace(/[^\w]+/g, '-').toLowerCase()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

// "4:00 PM - 5:30 PM IST | Wednesday, 12 June 2024 | Virtual event", as in the design.
function EventMeta({ event }) {
  return <p className={styles.meta}>{[event.time, event.fullDate, event.location].filter(Boolean).join(' | ')}</p>;
}

// Four-point sparkle beside the success badge.
const Sparkle = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0c.5 4.2 3.8 7.5 8 8-4.2.5-7.5 3.8-8 8-.5-4.2-3.8-7.5-8-8 4.2-.5 7.5-3.8 8-8z" fill="currentColor" /></svg>
);

export function RegisterEventModal({ event, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', organisation: '', role: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState(null);
  const modalRef = useRef(null);
  const onEscape = useEffectEvent(() => onClose());

  useEffect(() => {
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    modalRef.current?.querySelector('input, button')?.focus();
    const onKey = (e) => e.key === 'Escape' && onEscape();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/events/${event.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, discourseEventId: event.discourseEventId ?? null }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Registration failed. Please try again.');
      setRegisteredEmail(data.email);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.backdrop} style={BACKDROP_BLUR} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
        className={`${styles.modal} ${registeredEmail ? styles.done : ''}`}
      >
        <button type="button" className={styles.close} aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>

        {registeredEmail ? (
          <>
            <div className={styles.doneHead}>
              <div className={styles.badge} aria-hidden="true">
                <span className={styles.badgeCircle} />
                <Sparkle className={styles.sparkleLg} />
                <Sparkle className={styles.sparkleSm} />
                <Sparkle className={styles.sparkleXs} />
              </div>
              <h2 id="register-title" className={styles.doneTitle}>You’re Registered!</h2>
            </div>
            <div className={styles.doneRow}>
              <img className={styles.doneThumb} src={event.detailImage || event.image} alt="" />
              <div className={styles.doneInfo}>
                <h3 className={styles.doneEventTitle}>{event.title}</h3>
                <EventMeta event={event} />
              </div>
              <div className={styles.doneAside}>
                <button type="button" className={styles.calendar} onClick={() => downloadIcs(event)}>
                  <CalendarIcon /> Add to calendar
                </button>
                <p className={styles.confirmation}>A confirmation email has been sent to {registeredEmail}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <form className={styles.formCol} onSubmit={submit} noValidate>
              <div className={styles.eventHead}>
                <img className={styles.thumb} src={event.detailImage || event.image} alt="" />
                <div>
                  <span className={styles.eyebrow}>Register for event</span>
                  <h2 id="register-title" className={styles.eventTitle}>{event.title}</h2>
                  <EventMeta event={event} />
                </div>
              </div>

              <h3 className={styles.detailsTitle}>Your Details</h3>
              <label className={styles.field}>
                <span className={styles.label}>Name*</span>
                <input className={styles.input} value={form.name} onChange={set('name')} placeholder="Lorem Ipsum" autoComplete="name" required />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Email Address*</span>
                <input className={styles.input} type="email" value={form.email} onChange={set('email')} placeholder="Lorem Ipsum" autoComplete="email" required />
              </label>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.label}>Organisation Details*</span>
                  <input className={styles.input} value={form.organisation} onChange={set('organisation')} placeholder="E.g. Venture Capital" autoComplete="organization" required />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Your Role*</span>
                  <input className={styles.input} value={form.role} onChange={set('role')} placeholder="Family Office" autoComplete="organization-title" required />
                </label>
              </div>

              <button type="submit" className={styles.confirm} disabled={busy}>
                {busy ? 'REGISTERING…' : 'REGISTER'}
              </button>
              {error && <span className={styles.error} role="alert">{error}</span>}
            </form>

            <ul className={styles.benefits}>
              {BENEFITS.map((b) => (
                <li key={b.title} className={styles.benefit}>
                  {b.icon}
                  <div>
                    <div className={styles.benefitTitle}>{b.title}</div>
                    {b.text && <div className={styles.benefitText}>{b.text}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
