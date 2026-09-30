import React from 'react';

export function SubscribeWidget() {
  return (
    <div className="bg-gray-100" style={{ borderRadius: '0.8vw', padding: '1.2vw', marginBottom: '0.5vw' }}>
      <h3 className="font-semibold text-gray-800" style={{ fontSize: '0.85vw', marginBottom: '0.3vw' }}>
        Stay in Loop
      </h3>
      <p className="text-gray-500 leading-relaxed" style={{ fontSize: '0.65vw', marginBottom: '0.8vw' }}>
        Subscribe to get the latest insights, events and updates from AV CIRCLE.
      </p>

      <div className="flex relative">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-200 outline-none bg-white"
          style={{ padding: '0.5vw 0.8vw', borderRadius: '1.5vw', fontSize: '0.65vw' }}
        />
        <button
          className="absolute bg-[#3eb0ff] text-white border-none rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{ right: '0.2vw', top: '0.2vw', bottom: '0.2vw', width: '2vw' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.9vw', height: '0.9vw' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
