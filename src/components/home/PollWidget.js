import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import styles from './PollWidget.module.css';

const SAMPLE_QUESTION = 'When a family adds a new asset class, how long before it appears in consolidated reporting?';
const SAMPLE_OPTIONS = [
  { label: 'Same month', percent: 46 },
  { label: 'Within a quarter', percent: 28 },
  { label: 'Two quarters or more', percent: 16 },
  { label: 'It never fully does', percent: 10 },
];

// Bars alternate bright blue and slate.
const BAR_COLORS = ['#11A0DB', '#385E87'];

// `poll` is the forum's most-voted open poll; without it the sample poll shows.
export function PollWidget({ poll }) {
  const question = poll?.question || SAMPLE_QUESTION;
  const href = poll?.topicId ? `/conversations/${poll.topicId}` : '/poll';
  const pollData = poll
    ? poll.options.map((o) => ({ label: o.label, percent: parseInt(o.percentage, 10) || 0 }))
    : SAMPLE_OPTIONS;

  return (
    <Card className={styles.pollCard}>
      <div className={styles.header}>
        <h2 className={styles.tag}>POLL</h2>
        <Button href={href} variant="outlineDark" size="sm" icon={<ArrowRight size={14} />} iconPosition="right" className={styles.takePollBtn}>
          TAKE A POLL
        </Button>
      </div>

      <Reveal as="h3" className={styles.question}>
        <Link prefetch={false} href={href}>{question}</Link>
      </Reveal>

      <div className={styles.pollResults}>
        {pollData.map((item, index) => (
          <Reveal key={index} delay={150 + index * 120} className={styles.pollBarWrapper}>
            <div className={styles.pollBarBg}>
              <div
                className={styles.pollBarFill}
                style={{ width: `max(${item.percent}%, 4rem)`, backgroundColor: BAR_COLORS[index % 2] }}
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
