'use client';
import { useState } from 'react';
import { TextTabs } from './ProfileTabs';
import { INVITES } from './sampleProfile';
import styles from './Profile.module.css';

// Invites tab: invitations received (accept / decline) and sent.
export function InvitesPanel() {
  const [tab, setTab] = useState('received');
  const [answers, setAnswers] = useState({});
  const tabs = [
    { id: 'received', label: `Received (${INVITES.received.length})` },
    { id: 'sent', label: `Sent (${INVITES.sent.length})` },
  ];
  const list = INVITES[tab];

  return (
    <section className={`${styles.card} ${styles.listPanel}`} aria-labelledby="invites-title">
      <h2 id="invites-title" className={styles.panelTitle}>Invites</h2>
      <TextTabs tabs={tabs} active={tab} onChange={setTab} label="Invites" />

      <h3 className={styles.groupTitle}>{tab === 'received' ? 'Received Invited' : 'Sent Invites'}</h3>
      {list.map((inv) => (
        <div key={inv.id} className={styles.invite}>
          <div className={styles.invitePerson}>
            <img className={styles.smallAvatar} src={inv.avatar} alt="" />
            <div>
              <div className={styles.inviteName}>{inv.name}</div>
              <div className={styles.inviteSub}>{inv.role}</div>
              <div className={styles.inviteSub}>{inv.company}</div>
            </div>
          </div>
          <div className={styles.inviteNote}>
            {tab === 'received' ? <><strong>{inv.name}</strong> Invited you to join their network</> : <>You invited <strong>{inv.name}</strong> to join your network</>}
            <div>{inv.time}</div>
          </div>
          {tab === 'sent' ? (
            <span className={styles.inviteStatus}>Pending</span>
          ) : answers[inv.id] ? (
            <span className={styles.inviteStatus}>{answers[inv.id]}</span>
          ) : (
            <div className={styles.inviteActions}>
              <button type="button" className={styles.accept} onClick={() => setAnswers((a) => ({ ...a, [inv.id]: 'Accepted' }))}>ACCEPT</button>
              <button type="button" className={styles.decline} onClick={() => setAnswers((a) => ({ ...a, [inv.id]: 'Declined' }))}>DECLINE</button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
