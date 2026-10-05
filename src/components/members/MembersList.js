import MemberCard from './MemberCard';

export default function MembersList({ members, activeMemberId, onMemberSelect }) {
  return (
    <div className="bg-white flex flex-col h-full overflow-hidden" style={{ borderRadius: 'calc(1.2 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(0.8 * var(--sa)) rgba(0,0,0,0.06)' }}>
      {/* header */}
      <div className="flex justify-between items-center" style={{ padding: 'calc(2 * var(--sa)) calc(2.5 * var(--sa))', borderBottom: '1px solid #e5e7eb' }}>
        <h3 className="font-semibold text-[#132742] uppercase" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', letterSpacing: '0.1em' }}>MEMBERS</h3>
        <a href="#" className="text-[#6b7280] font-medium bg-white hover:bg-gray-50 flex items-center transition-colors" style={{ gap: 'calc(0.4 * var(--sa))', fontSize: 'calc(0.65 * var(--fa) + var(--fb))', padding: 'calc(0.4 * var(--sa)) calc(1 * var(--sa))', borderRadius: 'calc(1.5 * var(--sa))', border: 'calc(0.05 * var(--sa)) solid #e5e7eb', boxShadow: '0 calc(0.1 * var(--sa)) calc(0.5 * var(--sa)) rgba(0,0,0,0.03)' }}>
          MORE ACTIVE
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 'calc(0.8 * var(--da) + var(--db))', height: 'calc(0.8 * var(--da) + var(--db))' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      {/* list */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            isActive={activeMemberId === member.id}
            onClick={() => onMemberSelect(member)}
          />
        ))}
      </div>

      {/* footer */}
      <div className="flex justify-between items-center" style={{ padding: 'calc(1.5 * var(--sa)) calc(2.5 * var(--sa))', borderTop: '1px solid #e5e7eb' }}>
        <a href="#" className="text-[#9ca3af] font-medium hover:text-[#132742] flex items-center" style={{ gap: 'calc(0.4 * var(--sa))', fontSize: 'calc(0.7 * var(--fa) + var(--fb))' }}>
          VIEW ALL MEMBERS
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(0.8 * var(--da) + var(--db))', height: 'calc(0.8 * var(--da) + var(--db))' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>

        {/* Pagination */}
        <div className="flex items-center" style={{ gap: 'calc(0.4 * var(--sa))' }}>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`flex items-center justify-center cursor-pointer font-medium ${n === 1 ? 'text-white' : 'text-[#6b7280] hover:text-[#132742]'}`}
              style={{
                width: 'calc(1.8 * var(--da) + var(--db))',
                height: 'calc(1.8 * var(--da) + var(--db))',
                borderRadius: '50%',
                fontSize: 'calc(0.7 * var(--fa) + var(--fb))',
                border: 'none',
                backgroundColor: n === 1 ? '#00A4E4' : 'transparent'
              }}
            >
              {n}
            </button>
          ))}
          <span className="text-[#9ca3af]" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))' }}>.....</span>
          <button className="flex items-center justify-center cursor-pointer font-medium text-[#00A4E4] hover:underline bg-transparent" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))', border: 'none' }}>
            42
          </button>
          <button className="flex items-center justify-center cursor-pointer text-[#00A4E4] hover:text-[#0088be] bg-transparent" style={{ border: 'none' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(0.9 * var(--da) + var(--db))', height: 'calc(0.9 * var(--da) + var(--db))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
