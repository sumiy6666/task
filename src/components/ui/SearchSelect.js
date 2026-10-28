'use client';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './SearchSelect.module.css';

// Long lists (every city of a country) only render this many matches.
const MAX_SHOWN = 100;

// A dropdown you can type into to filter. `options`: [{ value, label, icon? }].
// With `allowCustom`, text that matches nothing can be used as the value
// (a town the list doesn't have). `inputClassName` styles the box like the
// form's other fields.
export function SearchSelect({
  value, onChange, options, placeholder, disabled = false, loading = false, allowCustom = false,
  inputClassName = '', ariaLabel, required,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listId = useId();
  const root = useRef(null);
  const list = useRef(null);

  const selected = options.find((o) => o.value === value);
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    // Names that start with the text first, then ones that contain it.
    const found = options.filter((o) => o.label.toLowerCase().includes(q));
    return found.sort((a, b) => b.label.toLowerCase().startsWith(q) - a.label.toLowerCase().startsWith(q));
  }, [options, query]);
  const typed = query.trim();
  const custom = allowCustom && typed && !matches.some((o) => o.label.toLowerCase() === typed.toLowerCase());
  const items = [...matches.slice(0, MAX_SHOWN), ...(custom ? [{ value: typed, label: `Use “${typed}”`, custom: true }] : [])];

  useEffect(() => {
    if (!open) return;
    const close = (e) => !root.current?.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  useEffect(() => {
    if (open) list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const show = () => {
    if (disabled || open) return;
    setOpen(true);
    setQuery('');
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
  };
  const choose = (item) => {
    onChange(item.value);
    setOpen(false);
    setQuery('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) return show();
      setActive((i) => Math.max(0, Math.min(items.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1))));
    } else if (e.key === 'Enter' && open) {
      e.preventDefault();
      if (items[active]) choose(items[active]);
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div ref={root} className={`${styles.root} ${open ? styles.open : ''}`}>
      <input
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && items[active] ? `${listId}-${active}` : undefined}
        aria-required={required}
        className={inputClassName}
        value={open ? query : selected?.label || value || ''}
        placeholder={loading ? 'Loading…' : open && (selected?.label || value) ? selected?.label || value : placeholder}
        disabled={disabled}
        autoComplete="off"
        onClick={show}
        onFocus={show}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onKeyDown={onKeyDown}
      />
      <ChevronDown className={styles.chevron} aria-hidden="true" />

      {open && (
        <ul id={listId} ref={list} role="listbox" className={styles.list}>
          {items.length === 0 && <li className={styles.note}>{loading ? 'Loading…' : 'No matches'}</li>}
          {items.map((item, i) => (
            <li
              key={item.custom ? '\u0000custom' : item.value}
              id={`${listId}-${i}`}
              data-index={i}
              role="option"
              aria-selected={item.value === value}
              className={`${styles.option} ${i === active ? styles.active : ''} ${item.value === value ? styles.selected : ''} ${item.custom ? styles.custom : ''}`}
              // Keep focus in the box, so choosing doesn't blur and reopen it.
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => choose(item)}
              onMouseMove={() => i !== active && setActive(i)}
            >
              {item.icon && <span className={styles.icon} aria-hidden="true">{item.icon}</span>}
              {item.label}
            </li>
          ))}
          {matches.length > MAX_SHOWN && <li className={styles.note}>Keep typing to narrow the list…</li>}
        </ul>
      )}
    </div>
  );
}
