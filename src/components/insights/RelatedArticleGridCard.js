import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Carousel } from '../ui/Carousel';
import { Reveal } from '../ui/Reveal';
import styles from './Article.module.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop';

// A related article: photo card with the title and summary over a navy wash.
export function RelatedArticleGridCard({ article }) {
  return (
    <Link
      prefetch={false}
      href={`/insights/${article.id}`}
      className={styles.relatedCard}
      style={{ backgroundImage: `url('${article.image || FALLBACK_IMAGE}')` }}
    >
      <span className={styles.relatedOverlay} aria-hidden="true" />
      <span className={styles.relatedText}>
        <span className={styles.relatedCardTitle}>{article.title}</span>
        <span className={styles.relatedCardDesc}>{article.description}</span>
      </span>
      <span className={styles.relatedArrow} aria-hidden="true"><ArrowRight size={13} /></span>
    </Link>
  );
}

// The Related Articles row under an article.
export function RelatedArticles({ articles }) {
  return (
    <Carousel id="related-title" title="RELATED ARTICLES" gap="1.45rem" headerClassName={styles.relatedHeader} className={styles.related}>
      {articles.map((article, i) => (
        <Reveal key={article.id} delay={(i % 3) * 150} className={styles.relatedCell}>
          <RelatedArticleGridCard article={article} />
        </Reveal>
      ))}
    </Carousel>
  );
}
