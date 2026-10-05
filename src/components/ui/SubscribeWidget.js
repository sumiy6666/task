import React from 'react';

export function SubscribeWidget() {
  return (
    <div className="bg-gray-100" style={{ borderRadius: 'calc(0.8 * var(--sa))', padding: 'calc(1.2 * var(--sa))', marginBottom: 'calc(0.5 * var(--sa))' }}>
      <h3 className="font-semibold text-gray-800" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))', marginBottom: 'calc(0.3 * var(--sa))' }}>
        Stay in Loop
      </h3>
      <p className="text-gray-500 leading-relaxed" style={{ fontSize: 'calc(0.65 * var(--fa) + var(--fb))', marginBottom: 'calc(0.8 * var(--sa))' }}>
        Subscribe to get the latest insights, events and updates from AV CIRCLE.
      </p>

      <div className="flex relative">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-200 outline-none bg-white"
          style={{ padding: 'calc(0.5 * var(--sa)) calc(0.8 * var(--sa))', borderRadius: 'calc(1.5 * var(--sa))', fontSize: 'calc(0.65 * var(--fa) + var(--fb))' }}
        />
        <button
          className="absolute bg-[#3eb0ff] text-white border-none rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{ right: 'calc(0.2 * var(--sa))', top: 'calc(0.2 * var(--sa))', bottom: 'calc(0.2 * var(--sa))', width: 'calc(2 * var(--da) + var(--db))' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(0.9 * var(--da) + var(--db))', height: 'calc(0.9 * var(--da) + var(--db))' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
