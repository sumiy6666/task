'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { isTopicHref } from '@/lib/links';
import styles from './Reveal.module.css';

// Fades its content up into place the first time it scrolls into view.
// `delay` (ms) staggers siblings; `as` picks the element to render, and an
// `href` makes it a Next.js link. With `stagger` (ms), the element itself
// stays put and its direct children fade up one after another instead, each
// `stagger` ms after the last, so a list can animate without wrapping items.
export function Reveal({ as = 'div', delay = 0, stagger, className = '', style, children, ...props }) {
  const Tag = props.href ? Link : as;
  if (isTopicHref(props.href)) props.prefetch = false;
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

  const timing = stagger
    ? { '--start': `${delay}ms`, '--stagger': `${stagger}ms` }
    : { transitionDelay: delay ? `${delay}ms` : undefined };

  return (
    <Tag
      ref={ref}
      className={`${stagger ? styles.group : styles.reveal} ${shown ? styles.shown : ''} ${className}`}
      style={{ ...style, ...timing }}
      {...props}
    >
      {children}
    </Tag>
  );
}
