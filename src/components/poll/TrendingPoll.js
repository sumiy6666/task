import Link from 'next/link';

const SAMPLE = {
  question: 'When a family adds a new asset class, how long before it appears in consolidated reporting?',
  options: [
    { label: 'Same month', percentage: '18%', highlighted: false },
    { label: 'Within a quarter', percentage: '34%', highlighted: true },
    { label: 'Two quarters or more', percentage: '27%', highlighted: false },
    { label: 'It never fully does', percentage: '21%', highlighted: false },
  ],
};

export default function TrendingPoll({ poll }) {
  const shown = poll || SAMPLE;
  return (
    <div className="relative overflow-hidden" style={{ borderRadius: 'calc(1.2 * var(--sa))', marginBottom: 'calc(2 * var(--sa))', minHeight: 'calc(30 * var(--da) + var(--db))', boxShadow: '0 calc(0.4 * var(--sa)) calc(1.5 * var(--sa)) rgba(0,0,0,0.1)' }}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(21, 75, 175, 0.95) 0%, rgba(21, 75, 175, 0.8) 40%, rgba(0,0,0,0) 100%), url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')`,
          zIndex: 1
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col justify-center h-full text-white" style={{ zIndex: 2, padding: 'calc(3 * var(--sa)) calc(4 * var(--sa))', width: 'var(--split)' }}>
        <div className="uppercase font-medium" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))', letterSpacing: '0.05em', marginBottom: 'calc(1.5 * var(--sa))', opacity: 0.9 }}>
          TRENDING POLL
        </div>

        <h2 className="font-semibold leading-tight" style={{ fontSize: 'calc(1.6 * var(--fa) + var(--fb))', marginBottom: 'calc(2.5 * var(--sa))', maxWidth: 'calc(35 * var(--da) + var(--db))' }}>
          {shown.topicId ? <Link href={`/conversations/${shown.topicId}`}>{shown.question}</Link> : shown.question}
        </h2>

        <div className="flex flex-col" style={{ gap: 'calc(0.7 * var(--sa))' }}>
          {shown.options.map((o) => ({ label: o.label, pct: o.percentage, active: o.highlighted })).map((opt, i) => (
            <div
              key={i}
              className="relative flex items-center justify-between overflow-hidden cursor-pointer transition-colors"
              style={{
                borderRadius: 'calc(2 * var(--sa))',
                height: 'calc(2.4 * var(--da) + var(--db))',
                border: opt.active ? 'none' : 'calc(0.1 * var(--sa)) solid rgba(255,255,255,0.4)',
                backgroundColor: opt.active ? 'rgba(0,164,228,0.8)' : 'transparent'
              }}
            >
              {opt.active && (
                <div
                  className="absolute left-0 top-0 bottom-0"
                  style={{ width: opt.pct, backgroundColor: '#0088be', borderRadius: 'calc(2 * var(--sa))' }}
                />
              )}
              <span className="relative z-10 text-white font-medium" style={{ paddingLeft: 'calc(1.5 * var(--sa))', fontSize: 'calc(0.85 * var(--fa) + var(--fb))' }}>{opt.label}</span>
              <span className="relative z-10 text-white font-medium" style={{ paddingRight: 'calc(1.5 * var(--sa))', fontSize: 'calc(0.85 * var(--fa) + var(--fb))' }}>{opt.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute flex" style={{ bottom: 'calc(2 * var(--sa))', right: 'calc(2 * var(--sa))', gap: 'calc(0.5 * var(--sa))', zIndex: 10 }}>
        <button className="rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer" style={{ width: 'calc(2.5 * var(--da) + var(--db))', height: 'calc(2.5 * var(--da) + var(--db))', backgroundColor: '#00A4E4', border: 'none', color: 'white' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 'calc(1.2 * var(--da) + var(--db))', height: 'calc(1.2 * var(--da) + var(--db))' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer" style={{ width: 'calc(2.5 * var(--da) + var(--db))', height: 'calc(2.5 * var(--da) + var(--db))', backgroundColor: '#00A4E4', border: 'none', color: 'white' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 'calc(1.2 * var(--da) + var(--db))', height: 'calc(1.2 * var(--da) + var(--db))' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
