import styles from './Profile.module.css';

// White bar of pill tabs. `tabs`: [{ id, label, icon: LucideIcon }].
// `small` is the second bar on the Activity tab (All, Topics, Replies…).
export function ProfileTabs({ tabs, active, onChange, small = false, label }) {
  return (
    <div className={`${styles.card} ${styles.tabs} ${small ? styles.subTabs : ''}`} role="tablist" aria-label={label}>
      {tabs.map(({ id, label: text, icon: Icon }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={active === id}
          className={`${styles.tab} ${active === id ? styles.tabActive : ''}`}
          onClick={() => onChange(id)}
        >
          {Icon && <Icon strokeWidth={1.5} aria-hidden="true" />}
          {text}
        </button>
      ))}
    </div>
  );
}

// Underlined text tabs inside a panel ("All(8)", "Mention(3)"…).
export function TextTabs({ tabs, active, onChange, label }) {
  return (
    <div className={styles.textTabs} role="tablist" aria-label={label}>
      {tabs.map(({ id, label: text }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={active === id}
          className={`${styles.textTab} ${active === id ? styles.textTabActive : ''}`}
          onClick={() => onChange(id)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
