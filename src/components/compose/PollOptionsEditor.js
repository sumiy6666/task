'use client';

import { useState } from 'react';
import styles from './Compose.module.css';
import { DragIcon, TrashIcon } from './icons';

// Discourse's default `poll_maximum_options` site setting.
const MAX_OPTIONS = 20;

export function PollOptionsEditor({ options, onChange, createOption }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const update = (index, text) => onChange(options.map((o, i) => (i === index ? { ...o, text } : o)));
  const remove = (index) => onChange(options.filter((_, i) => i !== index));

  const move = (from, to) => {
    if (from === null || to === null || from === to) return;
    const next = [...options];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  // Typing in the trailing "Add another option" row turns it into a real option.
  const addFromDraft = (text) => {
    if (!text) return;
    onChange([...options, createOption(text)]);
    requestAnimationFrame(() => {
      const inputs = document.querySelectorAll('[data-poll-option]');
      const last = inputs[inputs.length - 1];
      last?.focus();
      last?.setSelectionRange(text.length, text.length);
    });
  };

  const canAdd = options.length < MAX_OPTIONS;

  return (
    <ul className={styles.optionList}>
      {options.map((option, index) => (
        <li
          key={option.id}
          className={`${styles.optionRow} ${dragIndex === index ? styles.dragging : ''} ${overIndex === index && dragIndex !== index ? styles.dropTarget : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setOverIndex(index);
          }}
          onDrop={(e) => {
            e.preventDefault();
            move(dragIndex, index);
            setDragIndex(null);
            setOverIndex(null);
          }}
        >
          <span
            className={styles.dragHandle}
            draggable
            aria-hidden
            title="Drag to reorder"
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', String(index));
              setDragIndex(index);
            }}
            onDragEnd={() => {
              setDragIndex(null);
              setOverIndex(null);
            }}
          >
            <DragIcon />
          </span>
          <div className={styles.optionInput}>
            <input
              data-poll-option
              aria-label={`Option ${index + 1}`}
              placeholder={`Option ${index + 1}`}
              value={option.text}
              maxLength={255}
              onChange={(e) => update(index, e.target.value)}
              onKeyDown={(e) => {
                // Alt+Arrow moves an option without a mouse.
                if (e.altKey && e.key === 'ArrowUp' && index > 0) move(index, index - 1);
                if (e.altKey && e.key === 'ArrowDown' && index < options.length - 1) move(index, index + 1);
              }}
            />
            <button type="button" className={styles.trash} aria-label={`Remove option ${index + 1}`} onClick={() => remove(index)}>
              <TrashIcon />
            </button>
          </div>
        </li>
      ))}

      {canAdd && (
        <li className={styles.optionRow}>
          <span className={styles.dragHandle} style={{ cursor: 'default' }} aria-hidden>
            <DragIcon />
          </span>
          <div className={styles.optionInput}>
            <input
              className={styles.addPlaceholder}
              aria-label="Add another option"
              placeholder="Add another option"
              value=""
              maxLength={255}
              onChange={(e) => addFromDraft(e.target.value)}
            />
            <span className={styles.trash} aria-hidden>
              <TrashIcon />
            </span>
          </div>
        </li>
      )}
    </ul>
  );
}
