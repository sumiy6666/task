// Links to a single conversation or article. Next prefetches pages behind
// visible links, and these pages read the forum with the signed-in member's own
// (tightly rate-limited) key, so their links opt out of prefetching.
export const isTopicHref = (href) => typeof href === 'string' && /^\/(conversations|insights)\/\d+/.test(href);
