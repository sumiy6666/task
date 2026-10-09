import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import styles from './DiscussionForum.module.css';

const SAMPLE_TOPICS = [
  { category: 'Family Office', title: 'How do you approach next-gen engagement in your family office?', replies: 10, timeAgo: '14m ago', href: '/discussions' },
  { category: 'Accounting', title: 'Views on direct indexing for concentrated portfolios', replies: 10, timeAgo: '14m ago', href: '/discussions' },
  { category: 'Technology', title: 'Using AI for research and portfolio monitoring', replies: 10, timeAgo: '14m ago', href: '/discussions' },
  { category: 'Investments', title: 'How do you evaluate a fund manager beyond past performance?', replies: 10, timeAgo: '14m ago', href: '/discussions' },
];

// `topics` is a recent topic from each of four forum categories.
export function DiscussionForum({ topics: live }) {
  const topics = live?.length ? live : SAMPLE_TOPICS;

  return (
    <Card className={styles.forumCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>AV DISCUSSION FORUM</h2>
        <Button href="/discussions" variant="outlineDark" size="sm" icon={<ArrowRight size={14} />} iconPosition="right" className={styles.exploreBtn}>
          EXPLORE
        </Button>
      </div>

      <Reveal stagger={120} className={styles.grid}>
        {topics.map((topic, index) => (
          <Link key={index} prefetch={false} href={topic.href} className={styles.topicCard}>
            <h3 className={styles.category}>{topic.category}</h3>
            <p className={styles.question}>{topic.title}</p>
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <MessageSquare size={16} strokeWidth={1.6} aria-hidden="true" />
                {topic.replies}
                <span className="sr-only"> replies</span>
              </span>
              <span className={styles.metaItem}>
                <Clock size={16} strokeWidth={1.6} aria-hidden="true" />
                {topic.timeAgo}
              </span>
            </div>
          </Link>
        ))}
      </Reveal>
    </Card>
  );
}
