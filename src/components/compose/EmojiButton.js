'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Compose.module.css';
import { EmojiIcon } from './icons';

const EMOJIS = ['😀', '😂', '😊', '😍', '🤔', '😮', '😢', '😡', '👍', '👎', '👏', '🙌', '🙏', '💡', '🔥', '🎉', '✅', '❌', '📈', '📉', '💰', '🏦', '📊', '🚀'];

// The panel is placed against the window (position: fixed), so it is never
// cut off by the card it sits in, the sticky header or the screen edge: it
// opens above the button when there is room and below it otherwise, and is
// kept inside the screen sideways (phones get fewer columns).
const GAP = 8;
const EDGE = 8;

export function EmojiButton({ onPick, className = styles.toolButton, iconClassName, align = 'left' }) {
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState(null);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  // Measure the panel once it is drawn, then move it into view.
  useLayoutEffect(() => {
    if (!open) return;
    const position = () => {
      const button = buttonRef.current?.getBoundingClientRect();
      const panel = panelRef.current;
      if (!button || !panel) return;
      const width = panel.offsetWidth;
      const height = panel.offsetHeight;
      const header = document.querySelector('header')?.getBoundingClientRect().bottom || 0;
      const above = button.top - GAP - height >= Math.max(EDGE, header);
      const top = above ? button.top - GAP - height : Math.min(button.bottom + GAP, window.innerHeight - height - EDGE);
      const preferred = align === 'right' ? button.right - width : button.left;
      const left = Math.min(Math.max(EDGE, preferred), window.innerWidth - width - EDGE);
      setPlace({ top, left });
    };
    position();
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    window.addEventListener('scroll', close, true);
    return () => {
      window.removeEventListener('resize', close);
      window.removeEventListener('scroll', close, true);
    };
  }, [open, align]);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!ref.current?.contains(e.target) && !panelRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = () => {
    setPlace(null);
    setOpen((o) => !o);
  };

  return (
    <div ref={ref} style={{ position: 'relative', display: 'flex' }}>
      <button ref={buttonRef} type="button" className={className} aria-label="Insert emoji" aria-expanded={open} onClick={toggle}>
        <EmojiIcon className={iconClassName} />
      </button>
      {open && createPortal(
        <div
          ref={panelRef}
          className={styles.emojiPanel}
          role="listbox"
          aria-label="Emoji"
          // Hidden until placed, so it never flashes in the wrong spot.
          style={{ position: 'fixed', bottom: 'auto', right: 'auto', top: place?.top ?? 0, left: place?.left ?? 0, visibility: place ? 'visible' : 'hidden' }}
        >
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
        </div>,
        document.body
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
