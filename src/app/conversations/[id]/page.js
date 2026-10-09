import { cache } from 'react';
import { notFound, redirect } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import styles from '@/components/topic/Topic.module.css';
import { TopicActions } from '@/components/topic/TopicActions';
import { PollVote } from '@/components/topic/PollVote';
import { Replies } from '@/components/topic/Replies';
import { LikeButton } from '@/components/topic/LikeButton';
import { CommentIcon, EyeIcon, LikeIcon } from '@/components/topic/icons';
import { getCurrentUser, getTopic } from '@/lib/discourse';
import { DiscourseError } from '@/lib/discourse/client';
import { compactNumber, timeAgo } from '@/lib/discourse/format';
import { getSampleConversation, hasSampleConversation } from '@/components/topic/sampleConversations';

// Forum topics and sample conversations open here; other sample ids go back to the list.
const conversationHref = (id) => (/^\d+$/.test(String(id)) || hasSampleConversation(id) ? `/conversations/${id}` : '/discussions');

// Cached so generateMetadata and the page share one Discourse request.
const loadTopic = cache(async (id) => {
  const sample = getSampleConversation(id);
  if (sample) return sample;
  try {
    return await getTopic(id);
  } catch (error) {
    // A private topic (or a login-only forum) asks guests to sign in first.
    if (error instanceof DiscourseError && error.status === 403 && !(await getCurrentUser())) {
      redirect(`/api/auth/login?return=${encodeURIComponent(`/conversations/${id}`)}`);
    }
    if (error instanceof DiscourseError && (error.status === 404 || error.status === 403)) return null;
    throw error;
  }
});

export async function generateMetadata({ params }) {
  const { id } = await params;
  const topic = await loadTopic(id);
  return { title: topic ? `${topic.title} | AV Community` : 'Conversation not found' };
}

export default async function ConversationPage({ params }) {
  const { id } = await params;
  const [topic, currentUser] = await Promise.all([loadTopic(id), getCurrentUser()]);
  if (!topic) notFound();

  const first = topic.firstPost;

  return (
    <main className="container min-h-screen">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Individual Conversation' }]} />

      <div className={styles.layout}>
        <article className={`${styles.card} ${styles.main}`}>
          <Reveal>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{topic.title}</h1>
            {first && <TopicActions topicId={topic.id} postId={first.id} title={topic.title} initiallyBookmarked={first.bookmarked} />}
          </div>

          {first && (
            <>
              <div className={styles.author}>
                <img className={styles.avatarLg} src={first.author.avatar} alt="" />
                <div>
                  <div className={styles.authorName}>{first.author.name}</div>
                  <div className={styles.authorMeta}>
                    {timeAgo(first.createdAt)}
                    {topic.categoryName ? ` in ${topic.categoryName}` : ''}
                  </div>
                  {topic.tags.length > 0 && (
                    <div className={styles.tags}>
                      {topic.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Discourse sanitises "cooked" HTML server-side before returning it. */}
              <div className={styles.cooked} dangerouslySetInnerHTML={{ __html: first.html }} />
              {first.polls?.map((poll) => (
                <PollVote key={poll.name} postId={first.id} poll={poll} />
              ))}
            </>
          )}

          <div className={styles.stats}>
            <span className={`${styles.stat} ${styles.statActive}`}>
              <CommentIcon /> {compactNumber(topic.replyCount)}
            </span>
            {first ? (
              <LikeButton postId={first.id} initialLiked={Boolean(first.liked)} initialCount={topic.likeCount} />
            ) : (
              <span className={styles.stat}>
                <LikeIcon /> {compactNumber(topic.likeCount)}
              </span>
            )}
            <span className={styles.stat} style={{ width: 'auto' }}>
              <EyeIcon /> {compactNumber(topic.views)} views
            </span>
            <span className={styles.lastActivity}>Last activity {timeAgo(topic.lastActivityAt)}</span>
          </div>
          </Reveal>

          <Replies topicId={topic.id} replies={topic.replies} currentUser={currentUser} />
        </article>

        {topic.related.length > 0 && (
          <aside className={`${styles.card} ${styles.side}`} aria-labelledby="related-heading">
            <h2 id="related-heading" className={styles.relatedHeading}>Related Discussions</h2>
            {topic.related.map((item, i) => (
              <Reveal key={item.id} delay={150 + i * 120} href={conversationHref(item.id)} className={styles.relatedItem}>
                <img className={styles.avatarLg} src={item.avatar} alt="" />
                <span className={styles.relatedTitle}>{item.title}</span>
              </Reveal>
            ))}
          </aside>
        )}
      </div>
    </main>
  );
}
