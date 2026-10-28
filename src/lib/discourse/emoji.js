// Discourse stores emoji as :shortcodes: in titles and excerpts (":joy:").
// They are turned back into emoji here; a code we don't know is dropped
// rather than shown as text.
import { emojify } from 'node-emoji';

// Discourse names that differ from the library's.
const ALIASES = {
  slight_smile: 'slightly_smiling_face',
  slightly_smiling: 'slightly_smiling_face',
  money_bag: 'moneybag',
  thumbsup: '+1',
  thumbsdown: '-1',
  smiling_face_with_three_hearts: 'smiling_face_with_three_hearts',
  rofl: 'rolling_on_the_floor_laughing',
  upside_down: 'upside_down_face',
};

// A name has at least one letter, so times and ratios ("10:30:45") are left alone.
const SHORTCODE = /:(\+1|-1|[a-z0-9_+-]*[a-z][a-z0-9_+-]*)(?::t\d)?:/gi;

export function withEmoji(text = '') {
  return String(text)
    .replace(SHORTCODE, (code, name) => {
      const key = ALIASES[name.toLowerCase()] || name.toLowerCase();
      const emoji = emojify(`:${key}:`);
      return emoji === `:${key}:` ? '' : emoji;
    })
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}
