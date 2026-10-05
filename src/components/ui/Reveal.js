'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Reveal.module.css';

// Fades its content up into place the first time it scrolls into view.
// `delay` (ms) staggers siblings; `as` picks the element to render, and an
// `href` makes it a Next.js link.
export function Reveal({ as = 'div', delay = 0, className = '', style, children, ...props }) {
  const Tag = props.href ? Link : as;
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Anything that has reached the viewport, or been scrolled past (a jump to
    // the bottom skips over it), is shown. A plain IntersectionObserver would
    // leave skipped-over sections invisible.
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight - 40) {
        setShown(true);
        stop();
      }
    };
    const stop = () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();
    return stop;
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${shown ? styles.shown : ''} ${className}`}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
      {...props}
    >
      {children}
    </Tag>
  );
}
