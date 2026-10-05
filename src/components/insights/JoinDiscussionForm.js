import React from 'react';

export function JoinDiscussionForm() {
  return (
    <div className="text-white h-full" style={{ background: 'linear-gradient(135deg, #4D4376, #2F72A8, #11A0DB)', borderRadius: 'calc(0.8 * var(--sa))', padding: 'calc(1.5 * var(--sa))' }}>
      <h3 className="font-medium" style={{ fontSize: 'calc(0.9 * var(--fa) + var(--fb))', marginBottom: 'calc(1 * var(--sa))' }}>Join Discussion</h3>

      <div className="flex flex-col" style={{ gap: 'calc(0.6 * var(--sa))' }}>
        <div style={{ borderBottom: 'calc(0.05 * var(--sa)) solid rgba(255,255,255,0.3)', paddingBottom: 'calc(0.4 * var(--sa))' }}>
          <input
            type="text"
            placeholder="Leave your comments"
            className="bg-transparent border-none text-white w-full outline-none placeholder-white/60"
            style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))' }}
          />
        </div>

        <div style={{ borderBottom: 'calc(0.05 * var(--sa)) solid rgba(255,255,255,0.3)', height: 'calc(1.5 * var(--da) + var(--db))' }} />
        <div style={{ borderBottom: 'calc(0.05 * var(--sa)) solid rgba(255,255,255,0.3)', height: 'calc(1.5 * var(--da) + var(--db))', marginBottom: 'calc(0.6 * var(--sa))' }} />

        <div>
          <button className="bg-transparent border-none text-white flex items-center cursor-pointer uppercase" style={{ gap: 'calc(0.4 * var(--sa))', fontSize: 'calc(0.65 * var(--fa) + var(--fb))', letterSpacing: '0.05em' }}>
            SEE ALL COMMENTS
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(0.9 * var(--da) + var(--db))', height: 'calc(0.9 * var(--da) + var(--db))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
