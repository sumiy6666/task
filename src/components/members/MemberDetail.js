export default function MemberDetail({ member }) {
  if (!member) return null;

  return (
    <div className="bg-white flex flex-col h-full overflow-hidden" style={{ borderRadius: 'calc(1.2 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(0.8 * var(--sa)) rgba(0,0,0,0.06)', padding: 'calc(2.5 * var(--sa))' }}>
      {/* Top Profile Info */}
      <div className="flex items-center" style={{ gap: 'calc(2 * var(--sa))', marginBottom: 'calc(2.5 * var(--sa))' }}>
        <div className="flex-shrink-0 rounded-full overflow-hidden" style={{ width: 'calc(8 * var(--da) + var(--db))', height: 'calc(8 * var(--da) + var(--db))', boxShadow: '0 calc(0.4 * var(--sa)) calc(1 * var(--sa)) rgba(0,0,0,0.1)' }}>
          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[#0056d6] font-semibold" style={{ fontSize: 'calc(1.4 * var(--fa) + var(--fb))', marginBottom: 'calc(0.5 * var(--sa))' }}>{member.name}</h2>
          <span className="text-[#132742] font-medium" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', marginBottom: 'calc(0.2 * var(--sa))' }}>{member.role}</span>
          <span className="text-[#132742]" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', marginBottom: 'calc(0.8 * var(--sa))' }}>{member.company}</span>
          <div className="flex items-center text-[#9ca3af]" style={{ gap: 'calc(0.4 * var(--sa))', fontSize: 'calc(0.75 * var(--fa) + var(--fb))' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(0.9 * var(--da) + var(--db))', height: 'calc(0.9 * var(--da) + var(--db))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.5-7-10a7 7 0 1 1 14 0c0 4.5-7 10-7 10z" />
              <circle cx="12" cy="11" r="3" />
            </svg>
            {member.location}
          </div>
        </div>
      </div>

      {/* Expertise */}
      <div style={{ marginBottom: 'calc(2 * var(--sa))' }}>
        <h3 className="font-semibold text-[#132742]" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', marginBottom: 'calc(1 * var(--sa))' }}>Expertise</h3>
        <div className="flex items-center flex-wrap" style={{ gap: 'calc(1 * var(--sa))' }}>
          {member.expertise.map((tag) => (
            <span key={tag} className="text-[#132742] hover:text-[#00A4E4] hover:underline cursor-pointer transition-colors" style={{ fontSize: 'calc(0.75 * var(--fa) + var(--fb))', textDecoration: 'underline', textUnderlineOffset: 'calc(0.2 * var(--sa))' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', margin: '0 calc(-2.5 * var(--sa)) calc(2 * var(--sa))' }} />

      {/* Bio */}
      <div style={{ flex: 1 }}>
        <h3 className="font-semibold text-[#132742]" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', marginBottom: 'calc(1 * var(--sa))' }}>Bio</h3>
        <p className="text-[#6b7280]" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))', lineHeight: '1.6' }}>
          {member.bio}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex justify-between" style={{ gap: 'calc(1.5 * var(--sa))', marginBottom: 'calc(2.5 * var(--sa))' }}>
        {[
          { label: 'DISCUSSIONS\nSTARTED', value: member.stats.discussions },
          { label: 'CONTRIBUTIONS', value: member.stats.contributions },
          { label: 'FOLLOWERS', value: member.stats.followers }
        ].map((stat, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-center text-center bg-white" style={{ borderRadius: 'calc(1 * var(--sa))', boxShadow: '0 calc(0.4 * var(--sa)) calc(1.2 * var(--sa)) rgba(0,0,0,0.08)', padding: 'calc(2 * var(--sa)) calc(1 * var(--sa))' }}>
            <span className="font-semibold text-[#132742] whitespace-pre-line uppercase" style={{ fontSize: 'calc(0.65 * var(--fa) + var(--fb))', letterSpacing: '0.05em', marginBottom: 'calc(1.5 * var(--sa))', minHeight: 'calc(2 * var(--da) + var(--db))' }}>
              {stat.label}
            </span>
            <span className="text-[#4bb5e8] font-light" style={{ fontSize: 'calc(2.5 * var(--fa) + var(--fb))', lineHeight: '1' }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Follow Button */}
      <button
        className="w-full flex items-center justify-center font-medium cursor-pointer transition-colors"
        style={{
          backgroundColor: '#eef3f7',
          color: '#00A4E4',
          border: 'none',
          borderRadius: 'calc(2 * var(--sa))',
          padding: 'calc(1 * var(--sa))',
          fontSize: 'calc(0.85 * var(--fa) + var(--fb))'
        }}
      >
        Follow Member
      </button>
    </div>
  );
}
