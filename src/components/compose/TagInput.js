'use client';
import { useId, useMemo, useRef, useState } from 'react';
import { cleanTag } from '@/lib/discourse/tags';
import styles from './TagInput.module.css';

const TagIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </svg>
);

// "Optional tags": chosen tags as chips, a box to search the forum's tags
// (with how often each is used) or add a new one, as on the forum's composer.
// Enter or comma adds what is typed; Backspace in an empty box removes the last tag.
export function TagInput({ value, onChange, options = [], max = 5, maxLength = 20 }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listId = useId();
  const full = value.length >= max;
  const typed = cleanTag(text, maxLength);

  // Matching tags not yet chosen, most used first; a new tag is offered last.
  const suggestions = useMemo(() => {
    const matches = options
      .filter((t) => !value.includes(t.name) && (!typed || t.name.includes(typed)))
      .slice(0, 8)
      .map((t) => ({ ...t, isNew: false }));
    if (typed && !value.includes(typed) && !options.some((t) => t.name === typed)) matches.push({ name: typed, count: 0, isNew: true });
    return matches;
  }, [options, value, typed]);

  const add = (name) => {
    const tag = cleanTag(name, maxLength);
    if (!tag || value.includes(tag) || full) return;
    onChange([...value, tag]);
    setText('');
    setActive(0);
    inputRef.current?.focus();
  };
  const remove = (tag) => onChange(value.filter((t) => t !== tag));

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      if (suggestions.length) setActive((i) => (i + (e.key === 'ArrowDown' ? 1 : -1) + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      const pick = open && suggestions[active] ? suggestions[active].name : typed;
      if (pick && (e.key !== 'Tab' || text)) {
        e.preventDefault();
        add(pick);
      }
    } else if (e.key === 'Backspace' && !text && value.length) {
      remove(value[value.length - 1]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const showList = open && !full && suggestions.length > 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.box} onClick={() => inputRef.current?.focus()}>
        <TagIcon className={styles.icon} />
        {value.map((tag) => (
          <span key={tag} className={styles.chip}>
            #{tag}
            <button type="button" className={styles.remove} aria-label={`Remove tag ${tag}`} onClick={(e) => { e.stopPropagation(); remove(tag); }}>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path strokeLinecap="round" d="M3 3l6 6M9 3l-6 6" /></svg>
            </button>
          </span>
        ))}
        {!full && (
          <input
            ref={inputRef}
            className={styles.input}
            value={text}
            placeholder={value.length ? 'Add another tag…' : 'Optional tags… type to search or create'}
            aria-label="Tags"
            role="combobox"
            aria-expanded={showList}
            aria-controls={listId}
            aria-autocomplete="list"
            maxLength={maxLength + 5}
            onChange={(e) => { setText(e.target.value.replace(',', '')); setOpen(true); setActive(0); }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            onKeyDown={onKeyDown}
          />
        )}
        <span className={styles.count}>{value.length}/{max}</span>
      </div>

      {showList && (
        <ul id={listId} className={styles.list} role="listbox" aria-label="Tag suggestions">
          {suggestions.map((t, i) => (
            <li key={t.name} role="option" aria-selected={i === active}>
              <button
                type="button"
                className={`${styles.option} ${i === active ? styles.optionActive : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => add(t.name)}
              >
                {t.isNew ? (
                  <><span className={styles.plus} aria-hidden="true">+</span> Create <strong>#{t.name}</strong></>
                ) : (
                  <><span>#{t.name}</span><span className={styles.uses}>×{t.count}</span></>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
