'use client';
import { Bold, Heading2, Italic, Link2, List, ListOrdered, Quote, Strikethrough } from 'lucide-react';
import styles from './Compose.module.css';

// Formatting buttons over a post's text box. Posts are written in Markdown,
// which the forum turns into formatted text: each button wraps the selected
// text (or a placeholder) in the matching marks, e.g. **bold**.
const INLINE = {
  bold: { before: '**', after: '**', placeholder: 'bold text' },
  italic: { before: '_', after: '_', placeholder: 'italic text' },
  strike: { before: '~~', after: '~~', placeholder: 'struck text' },
};
// Line formats are added at the start of every selected line.
const LINE = {
  heading: (line) => `## ${line.replace(/^#+\s*/, '')}`,
  bullets: (line) => `- ${line}`,
  numbers: (line, i) => `${i + 1}. ${line}`,
  quote: (line) => `> ${line}`,
};

const BUTTONS = [
  { id: 'bold', label: 'Bold', Icon: Bold },
  { id: 'italic', label: 'Italic', Icon: Italic },
  { id: 'strike', label: 'Strikethrough', Icon: Strikethrough },
  { id: 'heading', label: 'Heading', Icon: Heading2 },
  { id: 'bullets', label: 'Bulleted list', Icon: List },
  { id: 'numbers', label: 'Numbered list', Icon: ListOrdered },
  { id: 'quote', label: 'Quote', Icon: Quote },
  { id: 'link', label: 'Link', Icon: Link2 },
];

export function FormatToolbar({ textareaRef, value, onChange }) {
  const apply = (id) => {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const selected = value.slice(start, end);
    let next;
    let selectFrom;
    let selectTo;

    if (INLINE[id] || id === 'link') {
      let before;
      let after;
      let text = selected;
      if (id === 'link') {
        const url = window.prompt('Link URL', 'https://');
        if (!url || url === 'https://') return;
        before = '[';
        after = `](${url})`;
        text = selected || url;
      } else {
        ({ before, after } = INLINE[id]);
        text = selected || INLINE[id].placeholder;
      }
      next = value.slice(0, start) + before + text + after + value.slice(end);
      selectFrom = start + before.length;
      selectTo = selectFrom + text.length;
    } else {
      // Whole lines: from the start of the first selected line to the end of the last.
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const nextBreak = value.indexOf('\n', end);
      const lineEnd = nextBreak === -1 ? value.length : nextBreak;
      const lines = value.slice(lineStart, lineEnd).split('\n');
      const block = lines.map((line, i) => LINE[id](line, i)).join('\n');
      // Block formats need a blank line before them to start a new block.
      const lead = lineStart > 0 && value[lineStart - 2] !== '\n' && value.slice(0, lineStart).trim() ? '\n' : '';
      next = value.slice(0, lineStart) + lead + block + value.slice(lineEnd);
      selectFrom = lineStart + lead;
      selectTo = selectFrom + block.length;
    }

    onChange(next);
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(selectFrom, selectTo);
    });
  };

  return (
    <div className={styles.formatBar} role="toolbar" aria-label="Formatting">
      {BUTTONS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          className={styles.formatButton}
          aria-label={label}
          title={label}
          // Keep the text box's selection when the button is pressed.
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => apply(id)}
        >
          <Icon aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
