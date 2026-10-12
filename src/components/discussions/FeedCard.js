import React from 'react';
import Link from 'next/link';
import { Reveal } from '../ui/Reveal';
import { CommentBox } from '../ui/CommentBox';
import { BookmarkButton } from './BookmarkButton';
import { FeedLike } from './FeedLike';
import { FeedPoll } from './FeedPoll';
import { CommentIcon, EyeIcon, LikeIcon } from './icons';
import { compactNumber } from '@/lib/discourse/format';
import { hasSampleConversation } from '../topic/sampleConversations';
import styles from './Feed.module.css';

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

// A sample poll's labels, in the shape FeedPoll takes (it can't be voted on).
const samplePoll = (labels) => ({ options: labels.map((label) => ({ id: label, label, votes: 0 })) });

// One post in the discussions feed. Optional parts, in design order:
// `poll` or `pollOptions` (a poll: options first, author after), `image`,
// `body` (paragraphs), the like/comment/view counts, `reply` (the latest
// reply, with a reply box under it).
export function FeedCard({ item, currentUser }) {
  const href = topicHref(item.id);
  const poll = item.poll || (item.pollOptions?.length ? samplePoll(item.pollOptions) : null);
  const isPoll = Boolean(poll);

  return (
    <Reveal as="article" className={styles.card}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>
          <Link prefetch={false} href={href}>{item.title}</Link>
        </h2>
        <BookmarkButton topicId={item.id} />
      </div>

      {isPoll ? (
        <FeedPoll poll={poll} href={href} />
      ) : (
        <Author item={item} />
      )}

      {item.image && <img className={styles.image} src={item.image} alt="" />}

      {item.body?.length > 0 && (
        <div className={styles.body}>
          {item.body.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </div>
      )}

      {isPoll && <div className={styles.pollAuthor}><Author item={item} /></div>}

      {/* Every post, poll and article shows its comments, likes and views. */}
      {(item.replies != null || item.likes != null) && (
        <div className={styles.stats}>
          <Link prefetch={false} href={href} className={styles.stat}><CommentIcon />{item.replies ?? 0}<span className="sr-only"> replies</span></Link>
          <FeedLike topicId={item.id} initialCount={item.likes ?? 0} live={isLive(item.id)} />
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
