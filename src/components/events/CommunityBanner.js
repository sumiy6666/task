import Link from 'next/link';

export default function CommunityBanner() {
  return (
    <div className="flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #0c2b4a 0%, #00A4E4 100%)', borderRadius: '1.2vw', padding: '2.5vw 4vw' }}>
      <div>
        <h3 className="text-white font-semibold uppercase" style={{ fontSize: '0.8vw', letterSpacing: '0.1em', marginBottom: '0.6vw' }}>
          STAY ENGAGED WITH THE COMMUNITY
        </h3>
        <p className="text-white/80" style={{ fontSize: '0.85vw' }}>
          Navigating market volatility: Strategies for family portfolios
        </p>
      </div>
      <Link
        href="/discussions"
        className="inline-flex items-center text-[#00A4E4] bg-white hover:bg-gray-50 transition-colors font-medium"
        style={{ gap: '0.6vw', padding: '0.7vw 2vw', borderRadius: '2vw', fontSize: '0.85vw', whiteSpace: 'nowrap' }}
      >
        Explore Discussions
      </Link>
    </div>
  );
}
