'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Compose.module.css';
import { EmojiIcon } from './icons';

const EMOJIS = ['😀', '😂', '😊', '😍', '🤔', '😮', '😢', '😡', '👍', '👎', '👏', '🙌', '🙏', '💡', '🔥', '🎉', '✅', '❌', '📈', '📉', '💰', '🏦', '📊', '🚀'];

export function EmojiButton({ onPick, className = styles.toolButton, iconClassName, align = 'left' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'flex' }}>
      <button type="button" className={className} aria-label="Insert emoji" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <EmojiIcon className={iconClassName} />
      </button>
      {open && (
        <div className={styles.emojiPanel} role="listbox" aria-label="Emoji" style={align === 'right' ? { left: 'auto', right: 0 } : undefined}>
          {EMOJIS.map((e) => (
            <button
              type="button"
              key={e}
              onClick={() => {
                onPick(e);
                setOpen(false);
              }}
            >
              {e}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Inserts text at the caret of a textarea/input and returns the new value.
export function insertAtCursor(el, value, text) {
  if (!el) return value + text;
  const start = el.selectionStart ?? value.length;
  const end = el.selectionEnd ?? value.length;
  const next = value.slice(0, start) + text + value.slice(end);
  requestAnimationFrame(() => {
    el.focus();
    el.setSelectionRange(start + text.length, start + text.length);
  });
  return next;
}
