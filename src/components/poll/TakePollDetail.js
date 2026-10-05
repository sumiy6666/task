export default function TakePollDetail({ poll }) {
  if (!poll) return null;

  const letterLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: 'calc(1.2 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(0.8 * var(--sa)) rgba(0,0,0,0.06)', padding: 'calc(2.5 * var(--sa)) calc(3 * var(--sa))' }}>
      <h3 className="font-semibold text-[#00A4E4] uppercase" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))', letterSpacing: '0.1em', marginBottom: 'calc(1.5 * var(--sa))' }}>TAKE POLL</h3>

      <h2 className="font-medium text-[#132742]" style={{ fontSize: 'calc(0.95 * var(--fa) + var(--fb))', lineHeight: '1.5', marginBottom: 'calc(2.5 * var(--sa))' }}>
        {poll.question}
      </h2>

      <div className="flex flex-col" style={{ gap: 'calc(1 * var(--sa))' }}>
        {poll.options.map((option, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer transition-colors hover:bg-[#e2e5e8]"
            style={{ padding: '0 calc(2 * var(--sa))', height: 'calc(2.5 * var(--da) + var(--db))', backgroundColor: '#f0f2f5', borderRadius: 'calc(2 * var(--sa))' }}
          >
            <span className="text-[#64748b] font-medium" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))', width: 'calc(3 * var(--da) + var(--db))' }}>{letterLabels[index]}</span>
            <span className="text-[#132742] font-medium flex-1" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))' }}>{option.label}</span>
            <span className="text-[#64748b] font-medium" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))' }}>{option.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
