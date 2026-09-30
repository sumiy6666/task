import React from 'react';

export function JoinDiscussionForm() {
  return (
    <div className="text-white h-full" style={{ background: 'linear-gradient(135deg, #4D4376, #2F72A8, #11A0DB)', borderRadius: '0.8vw', padding: '1.5vw' }}>
      <h3 className="font-medium" style={{ fontSize: '0.9vw', marginBottom: '1vw' }}>Join Discussion</h3>

      <div className="flex flex-col" style={{ gap: '0.6vw' }}>
        <div style={{ borderBottom: '0.05vw solid rgba(255,255,255,0.3)', paddingBottom: '0.4vw' }}>
          <input
            type="text"
            placeholder="Leave your comments"
            className="bg-transparent border-none text-white w-full outline-none placeholder-white/60"
            style={{ fontSize: '0.7vw' }}
          />
        </div>

        <div style={{ borderBottom: '0.05vw solid rgba(255,255,255,0.3)', height: '1.5vw' }} />
        <div style={{ borderBottom: '0.05vw solid rgba(255,255,255,0.3)', height: '1.5vw', marginBottom: '0.6vw' }} />

        <div>
          <button className="bg-transparent border-none text-white flex items-center cursor-pointer uppercase" style={{ gap: '0.4vw', fontSize: '0.65vw', letterSpacing: '0.05em' }}>
            SEE ALL COMMENTS
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.9vw', height: '0.9vw' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
