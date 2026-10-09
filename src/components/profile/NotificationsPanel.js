'use client';
import { useState } from 'react';
import { TextTabs } from './ProfileTabs';
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
export function NotificationsPanel() {
  const [kind, setKind] = useState('All');
  const [items, setItems] = useState(NOTIFICATIONS);
  const count = (k) => items.filter((n) => n.kind === k).length;
  const tabs = [{ id: 'All', label: `All(${items.length})` }, ...KINDS.map((k) => ({ id: k, label: `${k}(${count(k)})` }))];
  const shown = kind === 'All' ? items : items.filter((n) => n.kind === kind);
  const groups = [...new Set(shown.map((n) => n.group))];

  return (
    <section className={`${styles.card} ${styles.listPanel}`} aria-labelledby="notifications-title">
      <div className={styles.listHead}>
        <h2 id="notifications-title" className={styles.panelTitle}>Notifications</h2>
        <button type="button" className={styles.markRead} onClick={() => setItems((all) => all.map((n) => ({ ...n, unread: false })))}>
          Mark all as read
        </button>
      </div>

      <TextTabs tabs={tabs} active={kind} onChange={setKind} label="Notification type" />

      {groups.map((group) => (
        <div key={group}>
          <h3 className={styles.groupTitle}>{group}</h3>
          {shown.filter((n) => n.group === group).map((n) => (
            <div key={n.id} className={styles.notification}>
              <img className={styles.smallAvatar} src={n.avatar} alt="" />
              <div className={styles.notificationBody}>
                <div className={styles.notificationTitle}>{n.title}</div>
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
