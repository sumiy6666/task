import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Discussions.module.css';
import { FollowIcon } from './icons';

export function ActiveMembersList({ members }) {
  return (
    <div className={styles.card}>
      <Reveal as="h3" className={`${styles.cardTitle} ${styles.cardTitleRuled}`}>MOST ACTIVE MEMBERS</Reveal>
      <Reveal stagger={120} className={styles.memberList}>
        {members.map((member) => (
          <div key={member.name} className={styles.memberRow}>
            <img src={member.avatar} alt={member.name} className={`${styles.avatar} ${styles.memberAvatar}`} />
            <div className="min-w-0">
              <div className={styles.memberName}>{member.name}</div>
              <div className={styles.memberMeta}>{member.contributions} contributions</div>
            </div>
            <button type="button" className={styles.follow} title="Follow" aria-label={`Follow ${member.name}`}>
              <FollowIcon />
            </button>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
