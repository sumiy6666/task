// The editor works in HTML; the forum stores Markdown. Turndown converts the
// editor's HTML, keeping headings, bold, italic, strikethrough, lists, quotes,
// links and rules; underline becomes the forum's [u]…[/u].
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

let service;
function turndown() {
  if (service) return service;
  service = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '_', hr: '---' });
  service.use(gfm);
  // A link left with no text (editing next to a link can leave one) adds nothing.
  service.addRule('emptyLink', { filter: (node) => node.nodeName === 'A' && !node.textContent.trim(), replacement: () => '' });
  service.addRule('underline', { filter: ['u', 'ins'], replacement: (content) => `[u]${content}[/u]` });
  return service;
}

export const toMarkdown = (html = '') => (html.trim() ? turndown().turndown(html).trim() : '');

// True when the editor holds no words (Summernote leaves "<p><br></p>").
export const isBlankHtml = (html = '') => !html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

// The links the discussions page's composer hands over ("[url](url)") as HTML.
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export function markdownLinksToHtml(markdown = '') {
  return markdown
    .split(/\n{2,}/)
    .filter((p) => p.trim())
    .map((p) => `<p>${escape(p).replace(/\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g, (m, text, url) => `<a href="${url}">${text || url}</a>`)}</p>`)
    .join('');
}
