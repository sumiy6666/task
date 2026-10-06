import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Discussions.module.css';

export function PopularTagsList({ tags }) {
  return (
    <div className={styles.card}>
      <Reveal as="h3" className={`${styles.cardTitle} ${styles.cardTitleRuled}`}>POPULAR TAGS</Reveal>
      <Reveal stagger={120} className={styles.tagList}>
        {tags.map((tag) => (
          <div key={tag.name} className={styles.tagRow}>
            <span>#{tag.name}</span>
            <span>{tag.count}</span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
