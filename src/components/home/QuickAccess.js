'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import styles from './QuickAccess.module.css';

const ACTIONS = [
  { href: '/discussions', label: 'View the Community', icon: '/images/QA.svg' },
  { href: '/events', label: 'Events', icon: '/images/QA_icon1.png' },
  { href: '/insights', label: 'Insights', icon: '/images/QA_icon2.png' },
  { href: '/conversations/new', label: 'Conversations', icon: '/images/QA_icon3.png' },
];

export function QuickAccess() {
  // One action is expanded at a time: the hovered/focused one, or
  // "View the Community" when nothing is.
  const [activeIndex, setActiveIndex] = useState(0);
  const reset = () => setActiveIndex(0);

  return (
    <Card variant="dark" className={styles.quickAccessCard}>
      <h3 className={styles.title}>QUICK ACCESS</h3>

      <div className={styles.actions} onMouseLeave={reset} onBlur={reset}>
        {ACTIONS.map((action, i) => (
          <Link
            key={action.href}
            href={action.href}
            className={`${styles.action} ${i === activeIndex ? styles.active : ''}`}
            onMouseEnter={() => setActiveIndex(i)}
            onFocus={() => setActiveIndex(i)}
          >
            <span className={styles.circle}>
              {/* Masked so the icon can switch between blue and white. */}
              <span
                className={styles.icon}
                style={{ maskImage: `url(${action.icon})`, WebkitMaskImage: `url(${action.icon})` }}
                aria-hidden="true"
              />
            </span>
            <span className={styles.label}>{action.label}</span>
          </Link>
        ))}
      </div>
      <p className={styles.caption} aria-hidden="true">{ACTIONS[activeIndex].label}</p>
    </Card>
  );
}
