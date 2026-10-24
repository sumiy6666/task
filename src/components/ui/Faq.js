'use client';
import { useId, useState } from 'react';
import styles from './Faq.module.css';

// A card of questions; one answer opens at a time. `items`: [{ q, a }].
export function Faq({ title = 'FAQs', items, defaultOpen = null, className = '' }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <section className={`${styles.card} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
              <button
                type="button"
                className={styles.question}
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className={styles.sign} aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              <div id={`${id}-${i}`} className={styles.answerWrap} role="region" hidden={!isOpen}>
                <p className={styles.answer}>{item.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
