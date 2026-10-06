import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Discussions.module.css';

export function CategoryList({ categories }) {
  return (
    <div className={styles.card}>
      <Reveal as="h3" className={`${styles.cardTitle} ${styles.cardHeader}`}>CATEGORIES</Reveal>

      <Reveal stagger={120} className="flex flex-col">
        {categories.map((cat) => (
          <div key={cat.name} className={`${styles.categoryRow} ${cat.isActive ? styles.categoryActive : ''}`}>
            <span>{cat.name}</span>
            <span>{cat.count}</span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
