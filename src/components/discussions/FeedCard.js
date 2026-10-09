import React from 'react';
import Link from 'next/link';
import { Reveal } from '../ui/Reveal';
import { CommentBox } from '../ui/CommentBox';
import { BookmarkButton } from './BookmarkButton';
import { CommentIcon, EyeIcon, LikeIcon } from './icons';
import { compactNumber } from '@/lib/discourse/format';
import { hasSampleConversation } from '../topic/sampleConversations';
import styles from './Feed.module.css';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const isLive = (id) => typeof id === 'number' || /^\d+$/.test(String(id));
export const topicHref = (id) => (isLive(id) || hasSampleConversation(id) ? `/conversations/${id}` : '/discussions');

function Author({ item }) {
  return (
    <div className={styles.author}>
      <img className={styles.authorAvatar} src={item.author.avatar} alt="" />
      <div className="min-w-0">
        <div className={styles.authorName}>{item.author.name}</div>
        <div className={styles.authorMeta}>{item.timeAgo} in {item.category}</div>
        {item.tags?.length > 0 && (
          <div className={styles.tags}>{item.tags.map((tag) => `#${tag}`).join(' ')}</div>
        )}
      </div>
    </div>
  );
}

// One post in the discussions feed. Optional parts, in design order:
// `pollOptions` (a poll: options first, author last, no stats), `image`,
// `body` (paragraphs), `reply` (the latest reply, with a reply box under it).
export function FeedCard({ item, currentUser }) {
  const href = topicHref(item.id);
  const isPoll = Boolean(item.pollOptions?.length);

  return (
    <Reveal as="article" className={styles.card}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>
          <Link prefetch={false} href={href}>{item.title}</Link>
        </h2>
        <BookmarkButton topicId={item.id} />
      </div>

      {isPoll ? (
        <ul className={styles.options}>
          {item.pollOptions.map((option, i) => (
            <li key={option}>
              {/* Votes are cast on the discussion page. */}
              <Link prefetch={false} href={href} className={styles.option}>
                <span className={styles.optionLetter}>{LETTERS[i]}</span>
                {option}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Author item={item} />
      )}

      {item.image && <img className={styles.image} src={item.image} alt="" />}

      {item.body?.length > 0 && (
        <div className={styles.body}>
          {item.body.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </div>
      )}

      {isPoll ? (
        <div className={styles.pollAuthor}><Author item={item} /></div>
      ) : (
        <div className={styles.stats}>
          <span className={styles.stat}><CommentIcon />{item.replies}<span className="sr-only"> replies</span></span>
          <span className={styles.stat}><LikeIcon />{item.likes}<span className="sr-only"> likes</span></span>
          {item.views != null && <span className={styles.stat}><EyeIcon />{compactNumber(item.views)} views</span>}
          {item.lastActivity && <span className={styles.lastActivity}>Last activity {item.lastActivity}</span>}
        </div>
      )}

      {item.reply && (
        <>
          <div className={styles.reply}>
            <img className={styles.replyAvatar} src={item.reply.author.avatar} alt="" />
            <div className="min-w-0">
              <div className={styles.authorName}>{item.reply.author.name}</div>
              <p className={styles.replyText}>{item.reply.text}</p>
              <div className={styles.replyStats}>
                <span className={styles.stat}><LikeIcon />{item.reply.likes}</span>
                <span className={styles.stat}><CommentIcon />{item.reply.replies}</span>
              </div>
            </div>
          </div>
          <CommentBox topicId={item.id} avatar={currentUser?.avatar} placeholder="Write a reply" className={styles.replyBox} />
        </>
      )}
    </Reveal>
  );
}
