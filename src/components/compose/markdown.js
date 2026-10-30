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
  // The forum's strikethrough is ~~text~~ (the GFM plugin writes a single ~).
  service.addRule('strike', { filter: ['del', 's', 'strike'], replacement: (content) => `~~${content}~~` });
  service.addRule('underline', { filter: ['u', 'ins'], replacement: (content) => `[u]${content}[/u]` });
  return service;
}

// Markdown can't put a line break, a paragraph or edge spaces inside **bold**
// or _italic_ ("**The structures\n**" shows its marks as text). The editor
// happily formats a heading together with the line break after it, so the
// HTML is tidied first: line breaks and blocks are moved out of bold/italic/
// underline/strikethrough (formatting each line on its own), edge spaces are
// moved outside, and formatting left with no text is dropped.
const INLINE = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'INS', 'S', 'STRIKE', 'DEL']);
const BLOCK = new Set(['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'BLOCKQUOTE', 'PRE', 'HR', 'TABLE']);

function tidyFormatting(html) {
  if (typeof DOMParser === 'undefined') return html;
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstChild;
  // Innermost first, so nested formatting is already tidy when its parent is.
  const elements = [...root.querySelectorAll('*')].filter((el) => INLINE.has(el.nodeName)).reverse();
  for (const el of elements) {
    const parent = el.parentNode;
    if (!parent) continue;
    const pieces = [];
    let current = null;
    const close = () => {
      if (current) pieces.push(current);
      current = null;
    };
    for (const child of [...el.childNodes]) {
      if (child.nodeName === 'BR' || BLOCK.has(child.nodeName)) {
        close();
        if (BLOCK.has(child.nodeName)) {
          // Format the block's contents instead of wrapping the block.
          const inner = el.cloneNode(false);
          while (child.firstChild) inner.appendChild(child.firstChild);
          child.appendChild(inner);
        }
        pieces.push(child);
      } else {
        if (!current) current = el.cloneNode(false);
        current.appendChild(child);
      }
    }
    close();
    for (const piece of pieces) {
      if (!INLINE.has(piece.nodeName)) {
        parent.insertBefore(piece, el);
        continue;
      }
      // Edge spaces go outside the marks; empty formatting is dropped.
      const text = piece.textContent;
      if (!text.trim() && !piece.querySelector('img')) {
        if (text) parent.insertBefore(doc.createTextNode(' '), el);
        continue;
      }
      const lead = text.match(/^\s+/)?.[0];
      const trail = text.match(/\s+$/)?.[0];
      trimEdge(piece, 'start');
      trimEdge(piece, 'end');
      if (lead) parent.insertBefore(doc.createTextNode(' '), el);
      parent.insertBefore(piece, el);
      if (trail) parent.insertBefore(doc.createTextNode(' '), el);
    }
    parent.removeChild(el);
  }
  return root.innerHTML;
}

// Removes leading or trailing whitespace from the first or last text inside a node.
function trimEdge(node, side) {
  const walker = node.ownerDocument.createTreeWalker(node, 4 /* NodeFilter.SHOW_TEXT */);
  const texts = [];
  while (walker.nextNode()) texts.push(walker.currentNode);
  if (side === 'start') {
    for (const t of texts) {
      t.nodeValue = t.nodeValue.replace(/^\s+/, '');
      if (t.nodeValue) break;
    }
  } else {
    for (const t of texts.reverse()) {
      t.nodeValue = t.nodeValue.replace(/\s+$/, '');
      if (t.nodeValue) break;
    }
  }
}

export const toMarkdown = (html = '') => (html.trim() ? turndown().turndown(tidyFormatting(html)).trim() : '');

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
