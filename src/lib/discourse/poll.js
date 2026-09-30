// Builds the BBCode the Discourse poll plugin expects in a post body.
// https://meta.discourse.org/t/how-to-create-polls/77548

function escapeAttr(value) {
  return String(value).replace(/"/g, "'");
}

export function buildPollMarkup({ options, allowMultiple = false, anonymous = true, closesAt = null }) {
  const clean = options.map((o) => o.trim()).filter(Boolean);
  const attrs = [
    'name=poll',
    `type=${allowMultiple ? 'multiple' : 'regular'}`,
    'results=always',
    'chartType=bar',
  ];
  if (allowMultiple) attrs.push('min=1', `max=${clean.length}`);
  // Discourse polls hide voter identity unless public=true.
  if (!anonymous) attrs.push('public=true');
  if (closesAt) attrs.push(`close="${escapeAttr(closesAt)}"`);

  return `[poll ${attrs.join(' ')}]\n${clean.map((o) => `* ${o}`).join('\n')}\n[/poll]`;
}
