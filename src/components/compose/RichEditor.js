'use client';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import 'summernote/dist/summernote-lite.min.css';
import styles from './Compose.module.css';

// The post editor: Summernote (the "lite" build, which needs jQuery but not
// Bootstrap), loaded in the browser only. It works in HTML; ComposeFlow turns
// that into Markdown for the forum (see toMarkdown in ./markdown.js). Only
// formatting the forum keeps is offered: fonts, sizes and colours would be
// dropped by the forum when the post is saved, so they are not in the toolbar.
const TOOLBAR = [
  ['style', ['style']],
  ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
  ['para', ['ul', 'ol']],
  ['insert', ['link', 'hr']],
  ['history', ['undo', 'redo']],
];

export const RichEditor = forwardRef(function RichEditor({ initialHtml = '', onChange, placeholder = 'Write your post…', label = 'Message' }, ref) {
  const host = useRef(null);
  const editor = useRef(null);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { default: $ } = await import('jquery');
      // Summernote looks for jQuery on the window.
      window.jQuery = window.$ = $;
      await import('summernote/dist/summernote-lite.min.js');
      if (cancelled || !host.current) return;
      const $el = $(host.current);
      $el.summernote({
        placeholder,
        height: 280,
        toolbar: TOOLBAR,
        styleTags: ['p', 'h2', 'h3', 'h4', 'blockquote', 'pre'],
        disableDragAndDrop: true,
        dialogsInBody: true,
        callbacks: {
          onChange: (html) => onChangeRef.current?.(html),
          // Pasted text keeps its words but not the source's styling.
          onPaste: (e) => {
            const text = (e.originalEvent || e).clipboardData?.getData('text/plain');
            if (!text) return;
            e.preventDefault();
            document.execCommand('insertText', false, text);
          },
        },
      });
      if (initialHtml) $el.summernote('code', initialHtml);
      $el.next('.note-editor').find('.note-editable').attr({ 'aria-label': label, role: 'textbox', 'aria-multiline': 'true' });
      editor.current = $el;
    })();
    return () => {
      cancelled = true;
      editor.current?.summernote('destroy');
      editor.current = null;
    };
    // Set up once; later content changes come from typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    // Puts text (an emoji) where the cursor was, or at the end.
    insertText(text) {
      const $el = editor.current;
      if (!$el) return;
      $el.summernote('editor.restoreRange');
      $el.summernote('editor.focus');
      $el.summernote('editor.insertText', text);
    },
    clear() {
      editor.current?.summernote('reset');
      onChangeRef.current?.('');
    },
  }));

  return (
    <div className={styles.richEditor}>
      <div ref={host} />
    </div>
  );
});
