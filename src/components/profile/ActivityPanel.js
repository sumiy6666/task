'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Eye, Heart, List, ListFilter, MessageSquare, PenLine, Reply } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { ProfileTabs } from './ProfileTabs';
import { useProfileSection } from './useProfileSection';
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
            {/* Forum activity has no counts, so those are left out. */}
            {item.likes != null && <span><Heart strokeWidth={1.3} aria-hidden="true" />{item.likes}<span className="sr-only"> likes</span></span>}
            {item.comments != null && <span><MessageSquare strokeWidth={1.3} aria-hidden="true" />{item.comments}<span className="sr-only"> comments</span></span>}
            {item.views != null && <span><Eye strokeWidth={1.3} aria-hidden="true" />{item.views}<span className="sr-only"> views</span></span>}
            <Link prefetch={false} href={item.href} className={styles.viewPost}>VIEW POST</Link>
          </div>
        </div>
      </div>
      {item.image && <img className={styles.activityImage} src={item.image} alt="" />}
    </Reveal>
  );
}

// Drafts and bookmarks are the member's own, so a forum profile loads them
// when their filter is chosen.
const PRIVATE = { Drafts: 'drafts', Bookmarks: 'bookmarks' };

// Activity tab: a filter bar, then the member's posts as cards.
export function ActivityPanel({ items: activity = ACTIVITY, live = false }) {
  const [filter, setFilter] = useState('All');
  const [drafts] = useProfileSection('drafts', live && filter === 'Drafts');
  const [bookmarks] = useProfileSection('bookmarks', live && filter === 'Bookmarks');
  const own = { Drafts: drafts, Bookmarks: bookmarks }[filter];
  const items = live && PRIVATE[filter]
    ? own.items || []
    : filter === 'All' ? activity : activity.filter((a) => a.type === filter);
  const status = live && own && (own.loading ? 'Loading…' : own.error);

  return (
    <>
      <ProfileTabs tabs={FILTERS} active={filter} onChange={setFilter} small label="Activity filter" />
      {status ? (
        <div className={`${styles.card} ${styles.emptyState}`}>{status}</div>
      ) : items.length > 0 ? (
        items.map((item) => <ActivityCard key={item.id} item={item} />)
      ) : (
        <div className={`${styles.card} ${styles.emptyState}`}>Nothing in {filter} yet.</div>
      )}
    </>
  );
}
