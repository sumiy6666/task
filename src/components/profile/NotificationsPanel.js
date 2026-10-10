'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TextTabs } from './ProfileTabs';
import { useProfileSection } from './useProfileSection';
import { NOTIFICATIONS } from './sampleProfile';
import styles from './Profile.module.css';

const KINDS = ['Mention', 'Replies', 'Updates'];

// A notification line: plain text, or a list of parts split by a rule.
const Line = ({ line }) => (
  <div className={styles.notificationText}>
    {Array.isArray(line)
      ? line.map((part, i) => (
          <span key={part}>{i > 0 && <span className={styles.sep}>|</span>}{part}</span>
        ))
      : line}
  </div>
);

// Notifications tab: filter by kind, grouped by day, unread marked with a dot.
// A forum profile (`live`) loads the member's own notifications.
export function NotificationsPanel({ live = false }) {
  const [kind, setKind] = useState('All');
  const [sample, setSample] = useState(NOTIFICATIONS);
  const [forum, setForum] = useProfileSection('notifications', live);
  const items = live ? forum.items || [] : sample;
  const setItems = live ? setForum : setSample;
  const status = live && (forum.loading ? 'Loading…' : forum.error || (items.length === 0 && 'No notifications yet.'));

  const markAllRead = () => {
    setItems((all) => (all || []).map((n) => ({ ...n, unread: false })));
    if (live) fetch('/api/profile/notifications', { method: 'PUT' }).catch(() => {});
  };
  const count = (k) => items.filter((n) => n.kind === k).length;
  const tabs = [{ id: 'All', label: `All(${items.length})` }, ...KINDS.map((k) => ({ id: k, label: `${k}(${count(k)})` }))];
  const shown = kind === 'All' ? items : items.filter((n) => n.kind === kind);
  const groups = [...new Set(shown.map((n) => n.group))];

  return (
    <section className={`${styles.card} ${styles.listPanel}`} aria-labelledby="notifications-title">
      <div className={styles.listHead}>
        <h2 id="notifications-title" className={styles.panelTitle}>Notifications</h2>
        <button type="button" className={styles.markRead} onClick={markAllRead}>
          Mark all as read
        </button>
      </div>

      <TextTabs tabs={tabs} active={kind} onChange={setKind} label="Notification type" />

      {status && <p className={styles.groupTitle}>{status}</p>}

      {groups.map((group) => (
        <div key={group}>
          <h3 className={styles.groupTitle}>{group}</h3>
          {shown.filter((n) => n.group === group).map((n) => (
            <div key={n.id} className={styles.notification}>
              <img className={styles.smallAvatar} src={n.avatar} alt="" />
              <div className={styles.notificationBody}>
                <div className={styles.notificationTitle}>
                  {n.href ? <Link prefetch={false} href={n.href}>{n.title}</Link> : n.title}
                </div>
                {n.lines.map((line, i) => <Line key={i} line={line} />)}
              </div>
              <span className={styles.time}>{n.time}</span>
              {n.unread ? <span className={styles.unreadDot} aria-label="Unread" /> : <span className={styles.dotSpacer} />}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
