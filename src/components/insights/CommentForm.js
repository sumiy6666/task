import React from 'react';
import styles from './ArticleFooter.module.css';

// "Leave your comments" box at the end of an insight article. Insight
// articles are mock content, so there is nowhere to post the comment yet.
export function CommentForm() {
  return (
    <section className={styles.comments}>
      <label htmlFor="article-comment" className={`block ${styles.commentsTitle}`}>Leave your comments</label>
      <textarea id="article-comment" rows={3} className={styles.commentsInput} />
      <button type="button" className={styles.submit}>
        SUBMIT
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </section>
  );
}
