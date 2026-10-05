export default function MemberCard({ member, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center cursor-pointer transition-colors ${isActive ? 'bg-[#f4f6f9]' : 'hover:bg-gray-50'}`}
      style={{ padding: 'calc(1.5 * var(--sa)) calc(2 * var(--sa))', borderBottom: '1px solid #e5e7eb', gap: 'calc(1.5 * var(--sa))' }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 overflow-hidden" style={{ width: 'calc(4 * var(--da) + var(--db))', height: 'calc(4 * var(--da) + var(--db))', borderRadius: '50%', border: isActive ? '2px solid #00A4E4' : '2px solid transparent' }}>
        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col" style={{ gap: 'calc(0.3 * var(--sa))' }}>
        <span className="font-semibold text-[#00A4E4]" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))' }}>{member.name}</span>
        <div className="flex items-center text-[#6b7280]" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))', gap: 'calc(0.5 * var(--sa))' }}>
          <span>{member.role}</span>
          <span>|</span>
          <span>{member.company}</span>
        </div>
        <div className="flex items-center" style={{ gap: 'calc(0.8 * var(--sa))', fontSize: 'calc(0.7 * var(--fa) + var(--fb))' }}>
          <span className="text-[#6b7280]">Expertise:</span>
          {member.expertise.map((tag) => (
            <span key={tag} className="text-[#00A4E4] hover:underline cursor-pointer">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
