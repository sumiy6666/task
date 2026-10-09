'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './Carousel.module.css';

// A titled row of cards with prev/next arrows: three across on desktop, two
// on tablets, one and a peek on phones. Each child is one slide. `gap` sets
// the desktop space between slides; `headerClassName` adjusts the title row.
export function Carousel({ id, title, gap, className = '', headerClassName = '', children }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEnds = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEnds();
    window.addEventListener('resize', updateEnds);
    return () => window.removeEventListener('resize', updateEnds);
  }, [updateEnds]);

  // Move by one slide (its width plus the gap between slides).
  const scrollBySlide = (direction) => {
    const track = trackRef.current;
    const slide = track?.firstElementChild;
    if (!slide) return;
    const gapPx = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (slide.offsetWidth + gapPx), behavior: 'smooth' });
  };

  return (
    <section className={`${styles.section} ${className}`} aria-labelledby={id} style={gap ? { '--carousel-gap': gap } : undefined}>
      <div className={`${styles.header} ${headerClassName}`}>
        <h2 id={id} className={styles.title}>{title}</h2>
        <div className={styles.controls}>
          <button className={styles.navBtn} aria-label={`Previous ${title.toLowerCase()}`} onClick={() => scrollBySlide(-1)} disabled={atStart}>
            <ArrowLeft size={14} />
          </button>
          <button className={styles.navBtn} aria-label={`Next ${title.toLowerCase()}`} onClick={() => scrollBySlide(1)} disabled={atEnd}>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div ref={trackRef} className={styles.track} onScroll={updateEnds}>
        {React.Children.map(children, (child) => (
          <div className={styles.slide}>{child}</div>
        ))}
      </div>
    </section>
  );
}
