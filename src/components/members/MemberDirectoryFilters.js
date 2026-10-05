export default function MemberDirectoryFilters() {
  const dropdowns = [
    { label: 'Role', placeholder: 'All roles' },
    { label: 'Organisation', placeholder: 'All organisations' },
    { label: 'Geography', placeholder: 'All locations' },
    { label: 'Expertise', placeholder: 'All Expertise' },
    { label: 'Member Type', placeholder: 'All' }
  ];

  return (
    <div style={{ background: 'linear-gradient(90deg, #0033cc 0%, #00A4E4 100%)', borderRadius: 'calc(1.2 * var(--sa))', padding: 'calc(2.5 * var(--sa)) calc(3 * var(--sa)) calc(2 * var(--sa))', marginBottom: 'calc(2 * var(--sa))' }}>
      {/* Title */}
      <h2 className="text-white font-semibold uppercase" style={{ fontSize: 'calc(0.9 * var(--fa) + var(--fb))', letterSpacing: '0.1em', marginBottom: 'calc(1.8 * var(--sa))' }}>
        MEMBER DIRECTORY
      </h2>

      {/* Filter labels (desktop); smaller screens show each label above its field */}
      <div className="flex items-end max-lg:hidden" style={{ gap: 'calc(1 * var(--sa))', marginBottom: 'calc(0.6 * var(--sa))' }}>
        <div style={{ flex: '1 1 0' }}>
          <span className="text-white font-medium" style={{ fontSize: 'calc(0.75 * var(--fa) + var(--fb))' }}>Name</span>
        </div>
        {dropdowns.map((d) => (
          <div key={d.label} style={{ flex: '1 1 0' }}>
            <span className="text-white font-medium" style={{ fontSize: 'calc(0.75 * var(--fa) + var(--fb))' }}>{d.label}</span>
          </div>
        ))}
      </div>

      {/* Filter inputs */}
      <div className="flex max-lg:grid max-lg:grid-cols-3 max-sm:grid-cols-2" style={{ gap: 'calc(1 * var(--sa))', marginBottom: 'calc(1.8 * var(--sa))' }}>
        {/* Search input */}
        <div style={{ flex: '1 1 0' }}>
          <span className="hidden max-lg:block text-white font-medium" style={{ fontSize: 'calc(0.75 * var(--fa) + var(--fb))', marginBottom: 'calc(0.6 * var(--sa))' }}>Name</span>
          <div className="relative">
          <input
            type="text"
            placeholder="Search by name"
            className="w-full bg-white text-[#132742] outline-none"
            style={{ padding: 'calc(0.7 * var(--sa)) calc(2.5 * var(--sa)) calc(0.7 * var(--sa)) calc(1.2 * var(--sa))', borderRadius: 'calc(2 * var(--sa))', fontSize: 'calc(0.75 * var(--fa) + var(--fb))', border: 'none' }}
          />
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="absolute" style={{ right: 'calc(1 * var(--sa))', top: '50%', transform: 'translateY(-50%)', width: 'calc(1 * var(--da) + var(--db))', height: 'calc(1 * var(--da) + var(--db))' }}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          </div>
        </div>

        {/* Dropdown filters */}
        {dropdowns.map((d) => (
          <div key={d.label} style={{ flex: '1 1 0' }}>
            <span className="hidden max-lg:block text-white font-medium" style={{ fontSize: 'calc(0.75 * var(--fa) + var(--fb))', marginBottom: 'calc(0.6 * var(--sa))' }}>{d.label}</span>
            <div className="relative">
            <select
              className="w-full bg-white text-[#6b7280] appearance-none outline-none cursor-pointer"
              style={{ padding: 'calc(0.7 * var(--sa)) calc(2.5 * var(--sa)) calc(0.7 * var(--sa)) calc(1.2 * var(--sa))', borderRadius: 'calc(2 * var(--sa))', fontSize: 'calc(0.75 * var(--fa) + var(--fb))', border: 'none' }}
            >
              <option>{d.placeholder}</option>
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="absolute pointer-events-none" style={{ right: 'calc(1 * var(--sa))', top: '50%', transform: 'translateY(-50%)', width: 'calc(1 * var(--da) + var(--db))', height: 'calc(1 * var(--da) + var(--db))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex justify-between items-center">
        <button className="flex items-center text-white hover:text-white/80 transition-colors cursor-pointer bg-transparent" style={{ gap: 'calc(0.5 * var(--sa))', fontSize: 'calc(0.75 * var(--fa) + var(--fb))', border: 'none', padding: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1 * var(--da) + var(--db))', height: 'calc(1 * var(--da) + var(--db))' }}>
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="14" y2="12" />
            <line x1="4" y1="18" x2="10" y2="18" />
          </svg>
          More Filters
        </button>
        <button className="text-white hover:text-white/80 transition-colors cursor-pointer bg-transparent" style={{ fontSize: 'calc(0.75 * var(--fa) + var(--fb))', border: 'none', padding: 0 }}>
          Clear All
        </button>
      </div>
    </div>
  );
}
