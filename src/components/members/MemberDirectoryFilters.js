import styles from './Members.module.css';

const DROPDOWNS = [
  { label: 'Role', placeholder: 'All roles' },
  { label: 'Organisation', placeholder: 'All organisations' },
  { label: 'Geography', placeholder: 'All locations' },
  { label: 'Expertise', placeholder: 'All Expertise' },
  { label: 'Member Type', placeholder: 'All' }
];

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

export default function MemberDirectoryFilters() {
  return (
    <section className={styles.filters} aria-labelledby="member-search-title">
      <div className={`rise-in ${styles.filtersHead}`}>
        <h2 id="member-search-title" className={styles.filtersTitle}>SEARCH MEMBER DIRECTORY</h2>
        <button type="button" className={styles.clearAll}>
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
            <input type="text" placeholder="Search by name" className={styles.filterInput} />
            <SearchIcon />
          </span>
        </label>

        {DROPDOWNS.map((d, i) => (
          <label key={d.label} className={`rise-in ${styles.filterField}`} style={{ '--delay': `${0.27 + i * 0.12}s` }}>
            <span className={styles.filterLabel}>{d.label}</span>
            <span className={styles.filterControl}>
              <select className={styles.filterInput}>
                <option>{d.placeholder}</option>
              </select>
              <ChevronIcon />
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}
