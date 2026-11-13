import styles from './Members.module.css';

// The directory's filters. Each dropdown lists the values members actually have.
const DROPDOWNS = [
  { key: 'role', label: 'Role', placeholder: 'All roles' },
  { key: 'company', label: 'Organisation', placeholder: 'All organisations' },
  { key: 'location', label: 'Geography', placeholder: 'All locations' },
  { key: 'expertise', label: 'Expertise', placeholder: 'All Expertise' },
  { key: 'memberType', label: 'Member Type', placeholder: 'All' },
];

export const EMPTY_FILTERS = { name: '', role: '', company: '', location: '', expertise: '', memberType: '' };

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.filterIcon} aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.filterIcon} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function MemberDirectoryFilters({ values = EMPTY_FILTERS, options = {}, onChange = () => {}, onClear = () => {} }) {
  const set = (key) => (e) => onChange({ ...values, [key]: e.target.value });
  const active = Object.values(values).some(Boolean);

  return (
    <section className={styles.filters} aria-labelledby="member-search-title">
      <div className={`rise-in ${styles.filtersHead}`}>
        <h2 id="member-search-title" className={styles.filtersTitle}>SEARCH MEMBER DIRECTORY</h2>
        <button type="button" className={styles.clearAll} onClick={onClear} disabled={!active}>
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path strokeLinecap="round" d="M2 2l8 8M10 2l-8 8" />
          </svg>
          Clear All
        </button>
      </div>

      {/* Each label sits above its field */}
      <div className={styles.filterGrid}>
        <label className={`rise-in ${styles.filterField}`} style={{ '--delay': '0.15s' }}>
          <span className={styles.filterLabel}>Name</span>
          <span className={styles.filterControl}>
            <input type="search" placeholder="Search by name" className={styles.filterInput} value={values.name} onChange={set('name')} />
            <SearchIcon />
          </span>
        </label>

        {DROPDOWNS.map((d, i) => (
          <label key={d.key} className={`rise-in ${styles.filterField}`} style={{ '--delay': `${0.27 + i * 0.12}s` }}>
            <span className={styles.filterLabel}>{d.label}</span>
            <span className={styles.filterControl}>
              <select className={styles.filterInput} value={values[d.key]} onChange={set(d.key)}>
                <option value="">{d.placeholder}</option>
                {(options[d.key] || []).map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <ChevronIcon />
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}
