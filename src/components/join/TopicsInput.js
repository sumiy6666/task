'use client';
import { useId, useState } from 'react';
import { X } from 'lucide-react';
import styles from './Join.module.css';

const MAX_TOPICS = 10;

// Chips for the member's topics. Typing and pressing Enter (or a comma) adds
// one; picking a suggestion adds it straight away; Backspace in an empty box
// takes the last one off.
export function TopicsInput({ value, onChange, suggestions = [], label }) {
  const [text, setText] = useState('');
  const listId = useId();
  const has = (topic) => value.some((t) => t.toLowerCase() === topic.toLowerCase());

  const add = (raw) => {
    const topic = raw.trim().replace(/,$/, '').trim();
    setText('');
    if (topic && !has(topic) && value.length < MAX_TOPICS) onChange([...value, topic]);
  };
  const remove = (topic) => onChange(value.filter((t) => t !== topic));

  const onInput = (e) => {
    const next = e.target.value;
    if (next.endsWith(',') || suggestions.includes(next)) add(next);
    else setText(next);
  };
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      add(text);
    } else if (e.key === 'Backspace' && !text && value.length) {
      remove(value[value.length - 1]);
    }
  };

  return (
    <div className={styles.chips} onClick={(e) => e.currentTarget.querySelector('input')?.focus()}>
      {value.map((topic) => (
        <span key={topic} className={styles.chip}>
          {topic}
          <button type="button" className={styles.chipRemove} aria-label={`Remove ${topic}`} onClick={() => remove(topic)}>
            <X aria-hidden="true" />
          </button>
        </span>
      ))}
      {value.length < MAX_TOPICS && (
        <input
          className={styles.chipInput}
          value={text}
          onChange={onInput}
          onKeyDown={onKeyDown}
          onBlur={() => text.trim() && add(text)}
          list={listId}
          aria-label={label}
          placeholder={value.length ? '' : 'Type a topic and press Enter'}
        />
      )}
      <datalist id={listId}>
        {suggestions.filter((s) => !has(s)).map((s) => <option key={s} value={s} />)}
      </datalist>
    </div>
  );
}
