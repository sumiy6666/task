// Ready-made pictures members can use when an article or insight needs an image
// (files in public/images/default-covers; thumbs are 360px wide for the picker).
const ALTS = [
  'Presenter at a team meeting',
  'Boardroom overlooking a city skyline',
  'Speaker presenting a chart to colleagues',
  'Presenter at a whiteboard with notes',
  'Team discussing around a table',
  'Office desk with a city view at sunrise',
  'Team reviewing documents together',
  'Colleagues in a lively meeting',
  'Team meeting with a data dashboard',
];

export const DEFAULT_COVERS = ALTS.map((alt, i) => ({
  id: `cover-${i + 1}`,
  alt,
  src: `/images/default-covers/cover-${i + 1}.jpg`,
  thumb: `/images/default-covers/thumb-${i + 1}.jpg`,
}));
