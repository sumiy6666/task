export default function MemberDetail({ member }) {
  if (!member) return null;

  return (
    <div className="bg-white flex flex-col h-full overflow-hidden" style={{ borderRadius: '1.2vw', boxShadow: '0 0.2vw 0.8vw rgba(0,0,0,0.06)', padding: '2.5vw' }}>
      {/* Top Profile Info */}
      <div className="flex items-center" style={{ gap: '2vw', marginBottom: '2.5vw' }}>
        <div className="flex-shrink-0 rounded-full overflow-hidden" style={{ width: '8vw', height: '8vw', boxShadow: '0 0.4vw 1vw rgba(0,0,0,0.1)' }}>
          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[#0056d6] font-semibold" style={{ fontSize: '1.4vw', marginBottom: '0.5vw' }}>{member.name}</h2>
          <span className="text-[#132742] font-medium" style={{ fontSize: '0.85vw', marginBottom: '0.2vw' }}>{member.role}</span>
          <span className="text-[#132742]" style={{ fontSize: '0.85vw', marginBottom: '0.8vw' }}>{member.company}</span>
          <div className="flex items-center text-[#9ca3af]" style={{ gap: '0.4vw', fontSize: '0.75vw' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.9vw', height: '0.9vw' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.5-7-10a7 7 0 1 1 14 0c0 4.5-7 10-7 10z" />
              <circle cx="12" cy="11" r="3" />
            </svg>
            {member.location}
          </div>
        </div>
      </div>

      {/* Expertise */}
      <div style={{ marginBottom: '2vw' }}>
        <h3 className="font-semibold text-[#132742]" style={{ fontSize: '0.85vw', marginBottom: '1vw' }}>Expertise</h3>
        <div className="flex items-center flex-wrap" style={{ gap: '1vw' }}>
          {member.expertise.map((tag) => (
            <span key={tag} className="text-[#132742] hover:text-[#00A4E4] hover:underline cursor-pointer transition-colors" style={{ fontSize: '0.75vw', textDecoration: 'underline', textUnderlineOffset: '0.2vw' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', margin: '0 -2.5vw 2vw' }} />

      {/* Bio */}
      <div style={{ flex: 1 }}>
        <h3 className="font-semibold text-[#132742]" style={{ fontSize: '0.85vw', marginBottom: '1vw' }}>Bio</h3>
        <p className="text-[#6b7280]" style={{ fontSize: '0.8vw', lineHeight: '1.6' }}>
          {member.bio}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex justify-between" style={{ gap: '1.5vw', marginBottom: '2.5vw' }}>
        {[
          { label: 'DISCUSSIONS\nSTARTED', value: member.stats.discussions },
          { label: 'CONTRIBUTIONS', value: member.stats.contributions },
          { label: 'FOLLOWERS', value: member.stats.followers }
        ].map((stat, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-center text-center bg-white" style={{ borderRadius: '1vw', boxShadow: '0 0.4vw 1.2vw rgba(0,0,0,0.08)', padding: '2vw 1vw' }}>
            <span className="font-semibold text-[#132742] whitespace-pre-line uppercase" style={{ fontSize: '0.65vw', letterSpacing: '0.05em', marginBottom: '1.5vw', minHeight: '2vw' }}>
              {stat.label}
            </span>
            <span className="text-[#4bb5e8] font-light" style={{ fontSize: '2.5vw', lineHeight: '1' }}>
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
          borderRadius: '2vw',
          padding: '1vw',
          fontSize: '0.85vw'
        }}
      >
        Follow Member
      </button>
    </div>
  );
}
