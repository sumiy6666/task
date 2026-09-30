export default function TrendingPoll() {
  return (
    <div className="relative overflow-hidden" style={{ borderRadius: '1.2vw', marginBottom: '2vw', minHeight: '30vw', boxShadow: '0 0.4vw 1.5vw rgba(0,0,0,0.1)' }}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(21, 75, 175, 0.95) 0%, rgba(21, 75, 175, 0.8) 40%, rgba(0,0,0,0) 100%), url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')`,
          zIndex: 1
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col justify-center h-full text-white" style={{ zIndex: 2, padding: '3vw 4vw', width: '50%' }}>
        <div className="uppercase font-medium" style={{ fontSize: '0.8vw', letterSpacing: '0.05em', marginBottom: '1.5vw', opacity: 0.9 }}>
          TRENDING POLL
        </div>

        <h2 className="font-semibold leading-tight" style={{ fontSize: '1.6vw', marginBottom: '2.5vw', maxWidth: '35vw' }}>
          When a family adds a new asset class, how long before it appears in consolidated reporting?
        </h2>

        <div className="flex flex-col" style={{ gap: '0.7vw' }}>
          {[
            { label: 'Same month', pct: '18%', active: false },
            { label: 'Within a quarter', pct: '34%', active: true },
            { label: 'Two quarters or more', pct: '27%', active: false },
            { label: 'It never fully does', pct: '21%', active: false }
          ].map((opt, i) => (
            <div
              key={i}
              className="relative flex items-center justify-between overflow-hidden cursor-pointer transition-colors"
              style={{
                borderRadius: '2vw',
                height: '2.4vw',
                border: opt.active ? 'none' : '0.1vw solid rgba(255,255,255,0.4)',
                backgroundColor: opt.active ? 'rgba(0,164,228,0.8)' : 'transparent'
              }}
            >
              {opt.active && (
                <div
                  className="absolute left-0 top-0 bottom-0"
                  style={{ width: opt.pct, backgroundColor: '#0088be', borderRadius: '2vw' }}
                />
              )}
              <span className="relative z-10 text-white font-medium" style={{ paddingLeft: '1.5vw', fontSize: '0.85vw' }}>{opt.label}</span>
              <span className="relative z-10 text-white font-medium" style={{ paddingRight: '1.5vw', fontSize: '0.85vw' }}>{opt.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute flex" style={{ bottom: '2vw', right: '2vw', gap: '0.5vw', zIndex: 10 }}>
        <button className="rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer" style={{ width: '2.5vw', height: '2.5vw', backgroundColor: '#00A4E4', border: 'none', color: 'white' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '1.2vw', height: '1.2vw' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer" style={{ width: '2.5vw', height: '2.5vw', backgroundColor: '#00A4E4', border: 'none', color: 'white' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '1.2vw', height: '1.2vw' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
