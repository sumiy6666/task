export default function MemberCard({ member, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center cursor-pointer transition-colors ${isActive ? 'bg-[#f4f6f9]' : 'hover:bg-gray-50'}`}
      style={{ padding: '1.5vw 2vw', borderBottom: '1px solid #e5e7eb', gap: '1.5vw' }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 overflow-hidden" style={{ width: '4vw', height: '4vw', borderRadius: '50%', border: isActive ? '2px solid #00A4E4' : '2px solid transparent' }}>
        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col" style={{ gap: '0.3vw' }}>
        <span className="font-semibold text-[#00A4E4]" style={{ fontSize: '0.85vw' }}>{member.name}</span>
        <div className="flex items-center text-[#6b7280]" style={{ fontSize: '0.7vw', gap: '0.5vw' }}>
          <span>{member.role}</span>
          <span>|</span>
          <span>{member.company}</span>
        </div>
        <div className="flex items-center" style={{ gap: '0.8vw', fontSize: '0.7vw' }}>
          <span className="text-[#6b7280]">Expertise:</span>
          {member.expertise.map((tag) => (
            <span key={tag} className="text-[#00A4E4] hover:underline cursor-pointer">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
