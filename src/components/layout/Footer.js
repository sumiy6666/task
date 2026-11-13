'use client';
import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { usePathname } from 'next/navigation';

// Pages that run full-width without the site footer.
const NO_FOOTER = ['/conversations/new'];

const NAV_LINKS = [
  { href: '/discussions', label: 'DISCUSSIONS' },
  { href: '/poll', label: 'POLLS' },
  { href: '/events', label: 'EVENTS' },
  { href: '/members', label: 'MEMBERS' },
  { href: '/discussions', label: 'MY DASHBOARD' },
];

const ICON_LINKS = [
  { href: '#', label: 'AV Product', icon: '/images/Vector1.svg' },
  { href: '#', label: 'Support', icon: '/images/Icon4.svg' },
  { href: '#', label: 'AI Assistance', icon: '/images/Vector2.svg' },
];

const LEGAL_LINKS = [
  { href: '/about', label: 'About AV Community' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of use' },
  { href: '/guidelines', label: 'Community Guidelines' },
  { href: '/feedback', label: 'Site Feedback' },
];

// `nextEvent` is the forum's next upcoming event (see loadNextEvent).
export function Footer({ nextEvent }) {
  const pathname = usePathname();
  if (NO_FOOTER.includes(pathname)) return null;

  return (
    <div className={`container ${styles.wrapper}`}>
      <footer className={styles.footerContainer}>
        <div className={styles.top}>
          <div className={styles.loop}>
            <h3>STAY IN LOOP</h3>
            {nextEvent ? (
              <div className={styles.upcoming}>
                <p className={styles.upcomingText}>
                  <span className={styles.upcomingLabel}>Upcoming:</span> {nextEvent.title}
                  {nextEvent.date && <span className={styles.upcomingDate}>{nextEvent.date}{nextEvent.time ? ` · ${nextEvent.time}` : ''}</span>}
                </p>
                <Link href="/events" className={styles.notify}>
                  NOTIFY ME
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                </Link>
              </div>
            ) : (
              <div className={styles.upcoming}>
                <p className={styles.upcomingText}>Latest insights, events and updates<br className={styles.desktopBreak} /> from AV COMMUNITY.</p>
                <Link href="/events" className={styles.notify}>
                  SEE EVENTS
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                </Link>
              </div>
            )}

            <div className={styles.iconLinks}>
              {ICON_LINKS.map((link) => (
                <a key={link.label} href={link.href}>
                  <span className={styles.iconCircle}>
                    {/* The icons are white; a mask lets them take the brand blue. */}
                    <span
                      className={styles.icon}
                      style={{ maskImage: `url(${link.icon})`, WebkitMaskImage: `url(${link.icon})` }}
                      aria-hidden="true"
                    />
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href}>{link.label}</Link>
            ))}
          </nav>
        </div>

        {/* Stretched to the footer width whatever font renders it. */}
        <svg className={styles.wordmark} viewBox="0 0 1000 204" aria-hidden="true">
          <text x="0" y="169" textLength="1000" lengthAdjust="spacingAndGlyphs">Community</text>
        </svg>

        <div className={styles.bottomBar}>
          <p>&copy; 2026 AV COMMUNITY. All rights reserved.</p>
          <div className={styles.legalLinks}>
            {LEGAL_LINKS.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && <span className={styles.separator}>|</span>}
                <Link href={link.href}>{link.label}</Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
