import React from 'react';
import { RecommendedArticleItem } from './RecommendedArticleItem';
import { DiscussionItem } from './DiscussionItem';
import { FeedPoll } from '../discussions/FeedPoll';
import styles from './Article.module.css';

// The article page's side column: recommended articles, related
// discussions and the open poll, each in its own card. Empty lists are left out.
export function ArticleSidebar({ recommended = [], discussions = [], poll }) {
  return (
    <aside className={styles.sidebar} aria-label="More from the community">
      {recommended.length > 0 && (
        <section className={styles.sideCard}>
          <h2 className={styles.sideTitle}>Recommended Articles</h2>
          {recommended.map((article, i) => <RecommendedArticleItem key={article.id} article={article} index={i} />)}
        </section>
      )}

      {discussions.length > 0 && (
        <section className={styles.sideCard}>
          <h2 className={styles.sideTitle}>Related Discussions</h2>
          {discussions.map((discussion, i) => <DiscussionItem key={discussion.id} discussion={discussion} index={i} />)}
        </section>
      )}

      {poll && (
        <section className={styles.sideCard}>
          <h2 className={styles.sideTitle}>Recommended Polls</h2>
          <p className={styles.pollQuestion}>{poll.question}</p>
          <FeedPoll poll={poll} href={poll.topicId ? `/conversations/${poll.topicId}` : '/poll'} />
        </section>
      )}
    </aside>
  );
}
