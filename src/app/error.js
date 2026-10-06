'use client';

// Shown when a page could not be built, most often because the forum was busy
// (Discourse rate-limits API requests). "Try again" reloads the page: when the
// first load failed, retry() alone does not ask the server again.
export default function PageError() {
  return (
    <main className="container min-h-screen flex flex-col items-center justify-center text-center" style={{ gap: 16, padding: '80px 16px' }}>
      <h1 className="text-[#132742]" style={{ fontSize: 24, fontWeight: 500 }}>We couldn’t load this page</h1>
      <p className="text-[#64748b]" style={{ fontSize: 15, maxWidth: 420 }}>
        The community forum is busy right now. Please try again in a few seconds.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="text-white rounded-full hover:opacity-90"
        style={{ background: '#11a0db', padding: '10px 28px', fontSize: 14 }}
      >
        Try again
      </button>
    </main>
  );
}
