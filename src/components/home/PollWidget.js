import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import styles from './PollWidget.module.css';

const SAMPLE_QUESTION = 'When a family adds a new asset class, how long before it appears in consolidated reporting?';
const SAMPLE_OPTIONS = [
  { label: 'Same month', percent: 46, color: 'var(--color-primary)' },
  { label: 'Within a quarter', percent: 28, color: 'var(--color-secondary-light)' },
  { label: 'Two quarters or more', percent: 16, color: 'var(--color-primary)' },
  { label: 'It never fully does', percent: 10, color: 'var(--color-secondary-light)' },
];

const BAR_COLORS = ['var(--color-primary)', 'var(--color-secondary-light)'];

// `poll` is the forum's most-voted open poll; without it the sample poll shows.
export function PollWidget({ poll }) {
  const question = poll?.question || SAMPLE_QUESTION;
  const href = poll?.topicId ? `/conversations/${poll.topicId}` : '/poll';
  const pollData = poll
    ? poll.options.map((o, i) => ({ label: o.label, percent: parseInt(o.percentage, 10) || 0, color: BAR_COLORS[i % 2] }))
    : SAMPLE_OPTIONS;

  return (
    <Card className={styles.pollCard}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <img src="/images/Icon3.svg" alt="Polls" style={{ width: '24px', height: '24px' }} />
        </div>
        <div className={styles.titleSection}>
          <Reveal as="span" className={styles.tag}>POLLS</Reveal>
          <Reveal as="h3" delay={150}><Link href={href}>{question}</Link></Reveal>
        </div>
        <Link href="/poll" className={styles.learnMore}>
          LEARN MORE <ArrowRight size={14} />
        </Link>
      </div>

      <div className={styles.pollResults}>
        {pollData.map((item, index) => (
          <Reveal key={index} delay={300 + index * 120} className={styles.pollBarWrapper}>
            <div className={styles.pollBarBg}>
              <div 
                className={styles.pollBarFill} 
                style={{ width: `max(${item.percent}%, 44px)`, backgroundColor: item.color }}
              >
                <span className={styles.percentText}>{item.percent}%</span>
              </div>
            </div>
            <span className={styles.labelText}>{item.label}</span>
          </Reveal>
        ))}
      </div>
    </Card>
  );
}
