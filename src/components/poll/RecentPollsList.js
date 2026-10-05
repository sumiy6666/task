import { Reveal } from '@/components/ui/Reveal';
import Link from 'next/link';

export default function RecentPollsList({ polls, activePollId, onPollSelect }) {
  return (
    <div className="bg-white flex flex-col h-full overflow-hidden" style={{ borderRadius: 'calc(1.2 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(0.8 * var(--sa)) rgba(0,0,0,0.06)' }}>
      {/* header */}
      <div className="flex justify-between items-center" style={{ padding: 'calc(2 * var(--sa)) calc(2.5 * var(--sa))', borderBottom: '1px solid #e5e7eb' }}>
        <Reveal as="h3" className="font-semibold text-[#132742] uppercase" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', letterSpacing: '0.1em' }}>RECENT POLLS</Reveal>
        <Link href="/poll/closed" className="text-[#00A4E4] font-medium hover:underline flex items-center" style={{ gap: 'calc(0.3 * var(--sa))', fontSize: 'calc(0.7 * var(--fa) + var(--fb))' }}>
          VIEW ALL
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(0.8 * var(--da) + var(--db))', height: 'calc(0.8 * var(--da) + var(--db))' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* list */}
      <Reveal stagger={120} className="flex flex-col flex-1 overflow-y-auto">
        {polls.map((poll) => {
          const isActive = activePollId === poll.id;
          return (
            <div
              key={poll.id}
              onClick={() => onPollSelect(poll)}
              className="cursor-pointer transition-colors"
              style={{
                padding: 'calc(1.5 * var(--sa)) calc(2.5 * var(--sa))',
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: isActive ? '#eaeff4' : 'white'
              }}
            >
              <h4 className="font-medium text-[#132742]" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', marginBottom: 'calc(0.5 * var(--sa))', lineHeight: '1.4' }}>
                {poll.question}
              </h4>
              <div className="flex items-center text-[#9ca3af]" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))' }}>
                <span>{poll.category}</span>
                <span style={{ margin: '0 calc(0.5 * var(--sa))' }}>|</span>
                <span>{poll.time}</span>
              </div>
            </div>
          );
        })}
      </Reveal>
    </div>
  );
}
