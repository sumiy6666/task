'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Eye, Heart, List, ListFilter, MessageSquare, PenLine, Reply } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { ProfileTabs } from './ProfileTabs';
import { ACTIVITY } from './sampleProfile';
import styles from './Profile.module.css';

const FILTERS = [
  { id: 'All', label: 'All', icon: ListFilter },
  { id: 'Topics', label: 'Topics', icon: List },
  { id: 'Replies', label: 'Replies', icon: Reply },
  { id: 'Drafts', label: 'Drafts', icon: PenLine },
  { id: 'Likes', label: 'Likes', icon: Heart },
  { id: 'Bookmarks', label: 'Bookmarks', icon: Bookmark },
];

function ActivityCard({ item }) {
  return (
    <Reveal as="article" className={`${styles.card} ${styles.activity}`}>
      <div className={styles.activityMain}>
        <div className={styles.activityHead}>
          <span className={styles.ringAvatar}><img src={item.author.avatar} alt="" /></span>
          <div>
            <div className={styles.activityName}>{item.author.name} <span>. {item.timeAgo}</span></div>
            <div className={styles.activityAction}>{item.action}</div>
          </div>
        </div>

        <div className={styles.activityBody}>
          <h3 className={styles.activityTitle}>{item.title}</h3>
          <p className={styles.activityText}>{item.text}</p>
          {item.tags?.length > 0 && (
            <div className={styles.chips}>
              {item.tags.map((tag) => <span key={tag} className={styles.chip}>#{tag}</span>)}
            </div>
          )}
          <div className={styles.activityStats}>
            <span><Heart strokeWidth={1.3} aria-hidden="true" />{item.likes}<span className="sr-only"> likes</span></span>
            <span><MessageSquare strokeWidth={1.3} aria-hidden="true" />{item.comments}<span className="sr-only"> comments</span></span>
            <span><Eye strokeWidth={1.3} aria-hidden="true" />{item.views}<span className="sr-only"> views</span></span>
            <Link href={item.href} className={styles.viewPost}>VIEW POST</Link>
          </div>
        </div>
      </div>
      {item.image && <img className={styles.activityImage} src={item.image} alt="" />}
    </Reveal>
  );
}

// Activity tab: a filter bar, then the member's posts as cards.
export function ActivityPanel() {
  const [filter, setFilter] = useState('All');
  const items = filter === 'All' ? ACTIVITY : ACTIVITY.filter((a) => a.type === filter);

  return (
    <>
      <ProfileTabs tabs={FILTERS} active={filter} onChange={setFilter} small label="Activity filter" />
      {items.length > 0 ? (
        items.map((item) => <ActivityCard key={item.id} item={item} />)
      ) : (
        <div className={`${styles.card} ${styles.emptyState}`}>Nothing in {filter} yet.</div>
      )}
    </>
  );
}
