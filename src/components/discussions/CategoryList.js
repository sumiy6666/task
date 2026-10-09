import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Feed.module.css';

// Categories card beside the feed. Each row filters the feed; the first row
// (`isAll`) shows every category.
export function CategoryList({ categories, active }) {
  return (
    <Reveal as="nav" className={styles.categoriesCard} aria-labelledby="categories-title">
      <h2 id="categories-title" className={styles.sideTitle}>CATEGORIES</h2>
      <ul className={styles.categoryList}>
        {categories.map((cat) => {
          const isActive = cat.isAll ? !active : active === cat.name;
          return (
            <li key={cat.name}>
              <Link
                href={cat.isAll ? '/discussions' : `/discussions?category=${encodeURIComponent(cat.name)}`}
                scroll={false}
                className={`${styles.categoryRow} ${isActive ? styles.categoryActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{cat.name}</span>
                <span>{cat.count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}
