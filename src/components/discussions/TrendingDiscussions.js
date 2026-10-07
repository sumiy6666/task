'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Discussions.module.css';
import { CommentIcon, EyeIcon, LikeIcon } from './icons';

const tabs = ['MOST VIEWED', 'MOST REPLIED', 'MOST LIKED'];
const sortKey = { 'MOST VIEWED': 'views', 'MOST REPLIED': 'replies', 'MOST LIKED': 'likes' };

export function TrendingDiscussions({ conversations }) {
  const [activeTab, setActiveTab] = useState('MOST VIEWED');
  const key = sortKey[activeTab];
  const sorted = [...conversations].sort((a, b) => (b[key] || 0) - (a[key] || 0));

  return (
    <div className={styles.card}>
      <Reveal as="h3" className={`${styles.cardTitle} ${styles.cardHeader}`}>TRENDING DISCUSSIONS</Reveal>

      <Reveal stagger={100} delay={100} className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
          >
            {tab}
          </button>
        ))}
      </Reveal>

      <Reveal stagger={120} className="flex flex-col">
        {sorted.map((conv) => (
          <div key={conv.id} className={styles.trendRow}>
            <img src={conv.author.avatar} alt={conv.author.name} className={`${styles.avatar} ${styles.trendAvatar}`} />
            <div className="flex-1 min-w-0">
              <h4 className={styles.trendTitle}>
                {typeof conv.id === 'number' ? <Link prefetch={false} href={`/conversations/${conv.id}`}>{conv.title}</Link> : conv.title}
              </h4>
              <div className={`${styles.meta} ${styles.trendMeta}`}>
                {conv.author.name}
                <span className={styles.metaSep}>|</span>
                {conv.timeAgo} in {conv.category}
              </div>
            </div>
            <div className={`${styles.stats} ${styles.trendStats}`}>
              <span className={styles.stat}><EyeIcon />{conv.views}</span>
              <span className={styles.stat}><CommentIcon />{conv.replies}</span>
              <span className={styles.stat}><LikeIcon />{conv.likes}</span>
            </div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
