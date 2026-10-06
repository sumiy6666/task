'use client';
import { useState } from 'react';
import { ArrowRight, Clock, FileCheck2, Lightbulb, TrendingUp } from 'lucide-react';
import styles from './About.module.css';

const WASH = 'linear-gradient(to bottom, rgba(21, 75, 200, 0.85) 0%, rgba(21, 75, 200, 0.35) 40%, rgba(21, 75, 200, 0) 65%)';

const tabs = [
  {
    Icon: TrendingUp,
    label: 'Discuss',
    text: 'Ask questions, exchange ideas and learn how others approach similar challenges.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1400&auto=format&fit=crop'
  },
  {
    Icon: Clock,
    label: 'Attend',
    text: 'Join live sessions, webinars and events with practitioners and the AV team.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1400&auto=format&fit=crop'
  },
  {
    Icon: FileCheck2,
    label: 'Respond',
    text: 'Vote in polls and see how your approach compares with other family offices.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop'
  },
  {
    Icon: Lightbulb,
    label: 'Share',
    text: 'Share the lessons, workflows and resources that have worked for you.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1400&auto=format&fit=crop'
  }
];

// Photo panel with a white pill of icon tabs; each tab swaps the photo and text.
export function FeaturePanel() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div className={styles.panel} style={{ backgroundImage: `${WASH}, url('${tab.image}')` }}>
      <div className={styles.panelNav} role="tablist" aria-label="Ways to take part">
        {tabs.map(({ Icon, label }, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={label}
            onClick={() => setActive(i)}
            className={`${styles.panelTab} ${i === active ? styles.panelTabActive : ''}`}
          >
            <Icon strokeWidth={1.5} aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Keyed so the text fades in again when the tab changes. */}
      <div key={active} className={styles.panelBody} role="tabpanel">
        <div className={`rise-in ${styles.panelLabel}`}>{tab.label}</div>
        <p className={`rise-in ${styles.panelText}`} style={{ '--delay': '0.12s' }}>{tab.text}</p>
      </div>

      <button type="button" className={styles.panelNext} aria-label="Next" onClick={() => setActive((active + 1) % tabs.length)}>
        <ArrowRight strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  );
}
