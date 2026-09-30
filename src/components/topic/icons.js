const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const BookmarkIcon = ({ filled, ...p }) => (
  <svg viewBox="0 0 24 24" {...base} fill={filled ? 'currentColor' : 'none'} {...p}><path d="M6 3h12v18l-6-4.5L6 21z" /></svg>
);
export const ShareIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M14 5l7 6.5-7 6.5v-4c-6 0-9.5 1.5-12 5 .8-6 4-10 12-11z" /></svg>
);
export const CommentIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M3 4h18v12H9l-5 4v-4H3z" /></svg>
);
export const LikeIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M7 10v11H3V10zM7 10l4-7c1.7 0 2.7 1.2 2.4 2.9L13 9h6.3a2 2 0 0 1 2 2.4l-1.6 7.8a2 2 0 0 1-2 1.8H7" /></svg>
);
export const EyeIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" /><circle cx="12" cy="12" r="3" /></svg>
);
