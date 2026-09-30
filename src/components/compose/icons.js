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
