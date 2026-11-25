'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDownIcon } from './icons';
import styles from './Compose.module.css';

// "Topic" box: pick one or more of the forum's tags (up to `max`), in the
// same look as the category box. `options`: [{ name, count }]; `value`: tag names.
export function TopicPicker({ options = [], value = [], onChange, max = 5, readOnly = false, className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const listId = useId();
  const labelId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const toggle = (name) => {
    if (value.includes(name)) onChange(value.filter((t) => t !== name));
    else if (value.length < max) onChange([...value, name]);
  };
  const summary = value.length ? value.map((t) => `#${t}`).join(', ') : readOnly ? 'No topic' : 'Select topics';
  // Chosen topics first, then the rest (most used first).
  const ordered = [...options.filter((o) => value.includes(o.name)), ...options.filter((o) => !value.includes(o.name))];

  return (
    <div ref={ref} className={`${styles.category} ${styles.topicPicker} ${readOnly ? styles.categoryStatic : ''} ${className}`}>
      <span className={styles.categoryLabel} id={labelId}>Topic</span>
      <span className={styles.categoryValue} title={summary}>{summary}</span>
      <ChevronDownIcon className={styles.categoryChevron} style={{ transform: open ? 'rotate(180deg)' : undefined }} />
      {!readOnly && (
        <button
          type="button"
          className={styles.topicButton}
          aria-labelledby={labelId}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
        />
      )}
      {open && (
        <div className={styles.topicMenu}>
          <div className={styles.topicHint}>
            Pick up to {max} · {value.length}/{max}
            {value.length > 0 && <button type="button" onClick={() => onChange([])}>Clear</button>}
          </div>
          <ul id={listId} role="listbox" aria-multiselectable="true" aria-labelledby={labelId}>
            {ordered.map((o) => {
              const on = value.includes(o.name);
              const disabled = !on && value.length >= max;
              return (
                <li key={o.name} role="option" aria-selected={on} aria-disabled={disabled || undefined}>
                  <button type="button" disabled={disabled} className={on ? styles.topicOn : ''} onClick={() => toggle(o.name)}>
                    <span className={styles.topicCheck} aria-hidden="true">
                      {on && <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 6.2l2.3 2.3 4.7-4.9" /></svg>}
                    </span>
                    <span className={styles.topicName}>#{o.name}</span>
                    {typeof o.count === 'number' && <span className={styles.topicCount}>×{o.count}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
