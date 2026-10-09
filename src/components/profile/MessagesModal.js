'use client';
import { useEffect, useEffectEvent, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { MessagesPanel } from './MessagesPanel';
import styles from './Profile.module.css';

// The Messages panel from My Profile as a dialog over the page (opened from
// the header's message icon). Rendered into <body>: the sticky header's
// backdrop blur would otherwise trap a fixed-position child inside it.
export function MessagesModal({ onClose }) {
  const dialogRef = useRef(null);
  const onEscape = useEffectEvent(() => onClose());

  useEffect(() => {
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('input')?.focus();
    const onKey = (e) => e.key === 'Escape' && onEscape();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, []);

  return createPortal(
    <div
      className={styles.modalBackdrop}
      style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="messages-title" className={styles.modal}>
        <button type="button" className={styles.modalClose} aria-label="Close messages" onClick={onClose}>
          <X strokeWidth={1.5} />
        </button>
        <MessagesPanel />
      </div>
    </div>,
    document.body
  );
}
