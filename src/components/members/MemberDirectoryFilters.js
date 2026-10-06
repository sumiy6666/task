const fieldStyle = {
  height: 'calc(2.6 * var(--da) + var(--db))',
  padding: '0 calc(2.8 * var(--sa)) 0 calc(1.1 * var(--sa))',
  borderRadius: '999px',
  fontSize: 'calc(0.75 * var(--fa) + var(--fb))',
  border: 'none',
  boxShadow: '0 calc(0.2 * var(--sa)) calc(0.8 * var(--sa)) rgba(0, 0, 0, 0.12)'
};

const iconStyle = {
  right: 'calc(1.1 * var(--sa))',
  top: '50%',
  transform: 'translateY(-50%)',
  width: 'calc(1.2 * var(--da) + var(--db))',
  height: 'calc(1.2 * var(--da) + var(--db))'
};

const labelStyle = { fontSize: 'calc(0.85 * var(--fa) + var(--fb))' };

export default function MemberDirectoryFilters() {
  const dropdowns = [
    { label: 'Role', placeholder: 'All roles' },
    { label: 'Organisation', placeholder: 'All organisations' },
    { label: 'Geography', placeholder: 'All locations' },
    { label: 'Expertise', placeholder: 'All Expertise' },
    { label: 'Member Type', placeholder: 'All' }
  ];

  return (
    <div style={{ background: 'linear-gradient(90deg, #0033cc 0%, #0A63D6 50%, #11A0DB 100%)', borderRadius: 'calc(1.4 * var(--sa))', padding: 'calc(3 * var(--sa)) calc(3 * var(--sa)) calc(3 * var(--sa))', marginBottom: 'calc(2 * var(--sa))', boxShadow: '0 calc(0.4 * var(--sa)) calc(1.5 * var(--sa)) rgba(0, 51, 204, 0.15)' }}>
      {/* Title */}
      <h2 className="rise-in text-white uppercase" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', fontWeight: 400, marginBottom: 'calc(2.8 * var(--sa))' }}>
        SEARCH MEMBER DIRECTORY
      </h2>

      {/* Each label sits above its field */}
      <div className="grid grid-cols-6 max-lg:grid-cols-3 max-sm:grid-cols-1" style={{ columnGap: 'calc(1 * var(--sa))', rowGap: 'calc(1.5 * var(--sa))', marginBottom: 'calc(3.5 * var(--sa))' }}>
        {/* Name search */}
        <label className="rise-in flex flex-col" style={{ '--delay': '0.15s', gap: 'calc(1.2 * var(--sa))' }}>
          <span className="text-white" style={labelStyle}>Name</span>
          <span className="relative">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full bg-white text-[#132742] placeholder:text-[#6b7280] outline-none"
              style={fieldStyle}
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.5" className="absolute pointer-events-none" style={iconStyle}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
        </label>

        {/* Dropdown filters */}
        {dropdowns.map((d, i) => (
          <label key={d.label} className="rise-in flex flex-col" style={{ '--delay': `${0.27 + i * 0.12}s`, gap: 'calc(1.2 * var(--sa))' }}>
            <span className="text-white" style={labelStyle}>{d.label}</span>
            <span className="relative">
              <select className="w-full bg-white text-[#6b7280] appearance-none outline-none cursor-pointer" style={fieldStyle}>
                <option>{d.placeholder}</option>
              </select>
              <svg viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.5" className="absolute pointer-events-none" style={iconStyle}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </label>
        ))}
      </div>

      {/* Bottom row */}
      <div className="rise-in flex justify-end" style={{ '--delay': '0.9s' }}>
        <button type="button" className="text-white hover:text-white/80 transition-colors cursor-pointer bg-transparent" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', border: 'none', padding: 0 }}>
          Clear All
        </button>
      </div>
    </div>
  );
}
