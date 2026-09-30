export default function MemberDirectoryFilters() {
  const dropdowns = [
    { label: 'Role', placeholder: 'All roles' },
    { label: 'Organisation', placeholder: 'All organisations' },
    { label: 'Geography', placeholder: 'All locations' },
    { label: 'Expertise', placeholder: 'All Expertise' },
    { label: 'Member Type', placeholder: 'All' }
  ];

  return (
    <div style={{ background: 'linear-gradient(90deg, #0033cc 0%, #00A4E4 100%)', borderRadius: '1.2vw', padding: '2.5vw 3vw 2vw', marginBottom: '2vw' }}>
      {/* Title */}
      <h2 className="text-white font-semibold uppercase" style={{ fontSize: '0.9vw', letterSpacing: '0.1em', marginBottom: '1.8vw' }}>
        MEMBER DIRECTORY
      </h2>

      {/* Filter labels */}
      <div className="flex items-end" style={{ gap: '1vw', marginBottom: '0.6vw' }}>
        <div style={{ flex: '1 1 0' }}>
          <span className="text-white font-medium" style={{ fontSize: '0.75vw' }}>Name</span>
        </div>
        {dropdowns.map((d) => (
          <div key={d.label} style={{ flex: '1 1 0' }}>
            <span className="text-white font-medium" style={{ fontSize: '0.75vw' }}>{d.label}</span>
          </div>
        ))}
      </div>

      {/* Filter inputs */}
      <div className="flex" style={{ gap: '1vw', marginBottom: '1.8vw' }}>
        {/* Search input */}
        <div className="relative" style={{ flex: '1 1 0' }}>
          <input
            type="text"
            placeholder="Search by name"
            className="w-full bg-white text-[#132742] outline-none"
            style={{ padding: '0.7vw 2.5vw 0.7vw 1.2vw', borderRadius: '2vw', fontSize: '0.75vw', border: 'none' }}
          />
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="absolute" style={{ right: '1vw', top: '50%', transform: 'translateY(-50%)', width: '1vw', height: '1vw' }}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        {/* Dropdown filters */}
        {dropdowns.map((d) => (
          <div key={d.label} className="relative" style={{ flex: '1 1 0' }}>
            <select
              className="w-full bg-white text-[#6b7280] appearance-none outline-none cursor-pointer"
              style={{ padding: '0.7vw 2.5vw 0.7vw 1.2vw', borderRadius: '2vw', fontSize: '0.75vw', border: 'none' }}
            >
              <option>{d.placeholder}</option>
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="absolute pointer-events-none" style={{ right: '1vw', top: '50%', transform: 'translateY(-50%)', width: '1vw', height: '1vw' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex justify-between items-center">
        <button className="flex items-center text-white hover:text-white/80 transition-colors cursor-pointer bg-transparent" style={{ gap: '0.5vw', fontSize: '0.75vw', border: 'none', padding: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1vw', height: '1vw' }}>
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="14" y2="12" />
            <line x1="4" y1="18" x2="10" y2="18" />
          </svg>
          More Filters
        </button>
        <button className="text-white hover:text-white/80 transition-colors cursor-pointer bg-transparent" style={{ fontSize: '0.75vw', border: 'none', padding: 0 }}>
          Clear All
        </button>
      </div>
    </div>
  );
}
