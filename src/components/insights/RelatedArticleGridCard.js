import React from 'react';
import Link from 'next/link';
import styles from './ArticleFooter.module.css';

export function RelatedArticleGridCard({ article }) {
  return (
    <Link prefetch={false} href={`/insights/${article.id}`} className={`no-underline ${styles.card}`}>
      <img
        src={article.image || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=400&auto=format&fit=crop'}
        alt={article.title}
        className={styles.cardImage}
      />
      <h4 className={styles.cardTitle}>{article.title}</h4>
      <p className={styles.cardText}>{article.description}</p>
      <span className={styles.readMore}>
        Read More
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

// The Related Articles section: title and a row of cards.
export function RelatedArticles({ articles }) {
  return (
    <section className={styles.related}>
      <h3 className={styles.relatedTitle}>Related Articles</h3>
      <div className={styles.grid}>
        {articles.map((article) => (
          <RelatedArticleGridCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
