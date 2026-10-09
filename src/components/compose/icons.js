// Line icons drawn to match the AV Community Figma frames.

const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };

export const CloseIcon = (p) => (
  <svg viewBox="0 0 16 16" {...base} strokeWidth="1.6" {...p}><path d="M3 3l10 10M13 3L3 13" /></svg>
);

export const ChevronDownIcon = (p) => (
  <svg viewBox="0 0 14 14" {...base} strokeWidth="1.4" {...p}><path d="M1.5 4.5L7 10l5.5-5.5" /></svg>
);

export const EmojiIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.4" {...p}>
    <path d="M19.5 11.5a8 8 0 1 1-6.9-7.9" />
    <path d="M8 14.5s1.4 2 4 2 4-2 4-2" />
    <path d="M9 10h.01M15 10h.01" strokeWidth="2" />
    <path d="M19 2v5M16.5 4.5h5" />
  </svg>
);

export const ImageIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.4" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="9" cy="9" r="1.8" />
    <path d="M21 15.5l-5-5L5 21" />
  </svg>
);

export const LinkIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.4" {...p}>
    <path d="M9 17H7a5 5 0 0 1 0-10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" />
  </svg>
);

export const DragIcon = (p) => (
  <svg viewBox="0 0 10 16" fill="currentColor" {...p}>
    {[2, 8, 14].map((y) => (
      <g key={y}><circle cx="2" cy={y} r="1.6" /><circle cx="8" cy={y} r="1.6" /></g>
    ))}
  </svg>
);

export const TrashIcon = (p) => (
  <svg viewBox="0 0 18 20" {...base} strokeWidth="1.3" {...p}>
    <path d="M1.5 4.5h15M6.5 4.5V2.5h5v2M3.5 4.5l1 14h9l1-14M7 8v7.5M11 8v7.5" />
  </svg>
);

export const PaperPlaneIcon = (p) => (
  <svg viewBox="0 0 64 64" {...base} strokeWidth="2" {...p}>
    <path d="M58 6L6 25.5l22 7.5 7.5 22z" />
    <path d="M58 6L28 33" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg viewBox="0 0 64 64" {...base} strokeWidth="2.2" {...p}><path d="M14 33l12 12 26-28" /></svg>
);

export const Sparkle = (p) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...p}>
    <path d="M10 0c.6 5.2 3.2 8.4 10 10-6.8 1.6-9.4 4.8-10 10-.6-5.2-3.2-8.4-10-10C6.8 8.4 9.4 5.2 10 0z" />
  </svg>
);

// Post types on the Start a Discussion page.
export const ArticleIcon = (p) => (
  <svg viewBox="0 0 48 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M1 1h46M1 39h46M26 15h21M26 25h21" />
    <rect x="1" y="13" width="15" height="14" rx="3" />
  </svg>
);
export const PollIcon = (p) => (
  <svg viewBox="0 0 48 46" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}>
    <path d="M2 38v6M16 28v16M31 16v28M46 2v42" />
  </svg>
);
export const InsightIcon = (p) => (
  <svg viewBox="0 0 34 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M10 37v-7.5C4.6 27 1 21.9 1 17 1 8.2 8.2 1 17 1s16 7.2 16 16c0 4.9-3.6 10-9 12.5V37zM10 46h14M12 17h10" />
  </svg>
);
export const ChevronLeftIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
