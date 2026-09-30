export default function TakePollDetail({ poll }) {
  if (!poll) return null;

  const letterLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: '1.2vw', boxShadow: '0 0.2vw 0.8vw rgba(0,0,0,0.06)', padding: '2.5vw 3vw' }}>
      <h3 className="font-semibold text-[#00A4E4] uppercase" style={{ fontSize: '0.8vw', letterSpacing: '0.1em', marginBottom: '1.5vw' }}>TAKE POLL</h3>

      <h2 className="font-medium text-[#132742]" style={{ fontSize: '0.95vw', lineHeight: '1.5', marginBottom: '2.5vw' }}>
        {poll.question}
      </h2>

      <div className="flex flex-col" style={{ gap: '1vw' }}>
        {poll.options.map((option, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer transition-colors hover:bg-[#e2e5e8]"
            style={{ padding: '0 2vw', height: '2.5vw', backgroundColor: '#f0f2f5', borderRadius: '2vw' }}
          >
            <span className="text-[#64748b] font-medium" style={{ fontSize: '0.8vw', width: '3vw' }}>{letterLabels[index]}</span>
            <span className="text-[#132742] font-medium flex-1" style={{ fontSize: '0.8vw' }}>{option.label}</span>
            <span className="text-[#64748b] font-medium" style={{ fontSize: '0.8vw' }}>{option.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
