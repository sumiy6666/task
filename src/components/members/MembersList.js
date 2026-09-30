import MemberCard from './MemberCard';

export default function MembersList({ members, activeMemberId, onMemberSelect }) {
  return (
    <div className="bg-white flex flex-col h-full overflow-hidden" style={{ borderRadius: '1.2vw', boxShadow: '0 0.2vw 0.8vw rgba(0,0,0,0.06)' }}>
      {/* header */}
      <div className="flex justify-between items-center" style={{ padding: '2vw 2.5vw', borderBottom: '1px solid #e5e7eb' }}>
        <h3 className="font-semibold text-[#132742] uppercase" style={{ fontSize: '0.85vw', letterSpacing: '0.1em' }}>MEMBERS</h3>
        <a href="#" className="text-[#6b7280] font-medium bg-white hover:bg-gray-50 flex items-center transition-colors" style={{ gap: '0.4vw', fontSize: '0.65vw', padding: '0.4vw 1vw', borderRadius: '1.5vw', border: '0.05vw solid #e5e7eb', boxShadow: '0 0.1vw 0.5vw rgba(0,0,0,0.03)' }}>
          MORE ACTIVE
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '0.8vw', height: '0.8vw' }}>
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
      <div className="flex justify-between items-center" style={{ padding: '1.5vw 2.5vw', borderTop: '1px solid #e5e7eb' }}>
        <a href="#" className="text-[#9ca3af] font-medium hover:text-[#132742] flex items-center" style={{ gap: '0.4vw', fontSize: '0.7vw' }}>
          VIEW ALL MEMBERS
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.8vw', height: '0.8vw' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>

        {/* Pagination */}
        <div className="flex items-center" style={{ gap: '0.4vw' }}>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`flex items-center justify-center cursor-pointer font-medium ${n === 1 ? 'text-white' : 'text-[#6b7280] hover:text-[#132742]'}`}
              style={{
                width: '1.8vw',
                height: '1.8vw',
                borderRadius: '50%',
                fontSize: '0.7vw',
                border: 'none',
                backgroundColor: n === 1 ? '#00A4E4' : 'transparent'
              }}
            >
              {n}
            </button>
          ))}
          <span className="text-[#9ca3af]" style={{ fontSize: '0.7vw' }}>.....</span>
          <button className="flex items-center justify-center cursor-pointer font-medium text-[#00A4E4] hover:underline bg-transparent" style={{ fontSize: '0.7vw', border: 'none' }}>
            42
          </button>
          <button className="flex items-center justify-center cursor-pointer text-[#00A4E4] hover:text-[#0088be] bg-transparent" style={{ border: 'none' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.9vw', height: '0.9vw' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
