import Link from 'next/link';

export default function RecentPollsList({ polls, activePollId, onPollSelect }) {
  return (
    <div className="bg-white flex flex-col h-full overflow-hidden" style={{ borderRadius: '1.2vw', boxShadow: '0 0.2vw 0.8vw rgba(0,0,0,0.06)' }}>
      {/* header */}
      <div className="flex justify-between items-center" style={{ padding: '2vw 2.5vw', borderBottom: '1px solid #e5e7eb' }}>
        <h3 className="font-semibold text-[#132742] uppercase" style={{ fontSize: '0.85vw', letterSpacing: '0.1em' }}>RECENT POLLS</h3>
        <Link href="/poll/closed" className="text-[#00A4E4] font-medium hover:underline flex items-center" style={{ gap: '0.3vw', fontSize: '0.7vw' }}>
          VIEW ALL
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.8vw', height: '0.8vw' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* list */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {polls.map((poll) => {
          const isActive = activePollId === poll.id;
          return (
            <div
              key={poll.id}
              onClick={() => onPollSelect(poll)}
              className="cursor-pointer transition-colors"
              style={{
                padding: '1.5vw 2.5vw',
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: isActive ? '#eaeff4' : 'white'
              }}
            >
              <h4 className="font-medium text-[#132742]" style={{ fontSize: '0.85vw', marginBottom: '0.5vw', lineHeight: '1.4' }}>
                {poll.question}
              </h4>
              <div className="flex items-center text-[#9ca3af]" style={{ fontSize: '0.7vw' }}>
                <span>{poll.category}</span>
                <span style={{ margin: '0 0.5vw' }}>|</span>
                <span>{poll.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
