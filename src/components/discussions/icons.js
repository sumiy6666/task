// Line icons for the discussions page, drawn at the design's thin stroke.
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const CommentIcon = (props) => (
  <svg {...base} {...props}><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);

export const LikeIcon = (props) => (
  <svg {...base} {...props}><path d="M7 10v11M7 10l4-8a3 3 0 0 1 3 3v4h5.5a2 2 0 0 1 2 2.3l-1.3 8a2 2 0 0 1-2 1.7H7M7 10H4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3" /></svg>
);

export const EyeIcon = (props) => (
  <svg {...base} {...props}><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" /><circle cx="12" cy="12" r="3" /></svg>
);

export const BookmarkIcon = (props) => (
  <svg {...base} {...props}><path d="M19 21l-7-5-7 5V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z" /></svg>
);

export const ArrowIcon = (props) => (
  <svg {...base} strokeWidth={1.8} {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const FollowIcon = (props) => (
  <svg {...base} {...props}><circle cx="9" cy="7" r="4" /><path d="M2 21v-1a6 6 0 0 1 6-6h2M19 14v6M16 17h6" /></svg>
);
