import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Discussions.module.css';
import { ArrowIcon, BookmarkIcon, CommentIcon, LikeIcon } from './icons';

export function ConversationItem({ conversation, isFirst }) {
  const href = typeof conversation.id === 'number' ? `/conversations/${conversation.id}` : '#';

  return (
    <div className={styles.convRow}>
      <img src={conversation.author.avatar} alt={conversation.author.name} className={`${styles.avatar} ${styles.convAvatar}`} />

      <div className="flex-1 min-w-0">
        <Link href={href} className={`block ${styles.convTitle} ${isFirst ? styles.convTitleFirst : ''}`}>
          {conversation.title}
        </Link>
        <div className={`${styles.meta} ${styles.convMeta} ${isFirst ? styles.convMetaFirst : ''}`}>
          {conversation.author.name}
          <span className={styles.metaSep}>|</span>
          {conversation.timeAgo} in {conversation.category}
        </div>
      </div>

      <div className={styles.stats}>
        <span className={styles.stat}><CommentIcon />{conversation.replies}</span>
        <span className={styles.stat}><LikeIcon />{conversation.likes}</span>
        <BookmarkIcon className={styles.bookmark} />
      </div>
    </div>
  );
}

export function ConversationList({ title, conversations, showViewAll = false }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Reveal as="h3" className={styles.cardTitle}>{title}</Reveal>
        {showViewAll && (
          <Link href="/discussions" className={styles.viewAll}>
            VIEW ALL
            <ArrowIcon />
          </Link>
        )}
      </div>

      <Reveal stagger={120} className="flex flex-col">
        {conversations.map((conv, index) => (
          <ConversationItem key={conv.id} conversation={conv} isFirst={index === 0} />
        ))}
      </Reveal>
    </div>
  );
}
