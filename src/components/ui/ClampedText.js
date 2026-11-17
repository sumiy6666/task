'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';

const ELLIPSIS = /\s*(…|\.\.\.)$/;

// Text cut to `lines` lines, with "… more" straight after the last word that
// fits (not pushed to the end of the line). The fit is measured in the
// browser on a hidden copy, and again whenever the width changes. Before
// that, CSS clamps the text so the first paint is already the right height.
export function ClampedText({ text = '', href, lines = 2, className = '', style, moreClassName = '' }) {
  const boxRef = useRef(null);
  const measureRef = useRef(null);
  const [fitted, setFitted] = useState(null); // { text, cut } once measured

  useLayoutEffect(() => {
    const box = boxRef.current;
    const measure = measureRef.current;
    if (!box || !measure) return undefined;
    // The forum cuts long excerpts with "…": those always get "… more".
    const full = text.replace(ELLIPSIS, '');
    const forumCut = full !== text;

    const fit = () => {
      const lineHeight = parseFloat(getComputedStyle(measure).lineHeight) || 20;
      const maxHeight = lineHeight * lines + 1;
      const tries = (candidate, withMore) => {
        measure.textContent = withMore ? `${candidate}… more` : candidate;
        return measure.offsetHeight <= maxHeight;
      };
      if (tries(full, forumCut)) {
        setFitted((prev) => (prev?.text === full && prev.cut === forumCut ? prev : { text: full, cut: forumCut }));
        return;
      }
      // The longest start of the text that still fits with "… more", then
      // back to the end of a whole word.
      let lo = 0;
      let hi = full.length;
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (tries(full.slice(0, mid).trimEnd(), true)) lo = mid;
        else hi = mid - 1;
      }
      let cut = full.slice(0, lo);
      if (lo < full.length && !/\s/.test(full[lo])) cut = cut.replace(/\s+\S*$/, '');
      cut = cut.replace(/[\s,.;:–—-]+$/, '');
      setFitted((prev) => (prev?.text === cut && prev.cut ? prev : { text: cut, cut: true }));
    };

    fit();
    let width = box.clientWidth;
    const observer = new ResizeObserver(() => {
      if (box.clientWidth === width) return;
      width = box.clientWidth;
      fit();
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, [text, lines]);

  const clamp = fitted ? {} : { display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: lines, overflow: 'hidden' };

  return (
    <div ref={boxRef} className={className} style={{ ...style, position: 'relative' }}>
      <p style={clamp}>
        {fitted ? fitted.text : text}
        {fitted?.cut && (
          <>
            {'… '}
            <Link prefetch={false} href={href} className={moreClassName}>more</Link>
          </>
        )}
      </p>
      {/* Hidden copy at the same width and font, used only for measuring. */}
      <p ref={measureRef} aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, visibility: 'hidden', pointerEvents: 'none' }} />
    </div>
  );
}
