import React from 'react';

export function EventBanner() {
  return (
    <div className="relative overflow-hidden" style={{ borderRadius: '1.2vw', marginBottom: '2vw', minHeight: '30vw', boxShadow: '0 0.4vw 1.5vw rgba(0,0,0,0.1)' }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(21, 75, 175, 0.95) 0%, rgba(21, 75, 175, 0.8) 40%, rgba(0,0,0,0) 100%), url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop')`,
          zIndex: 1
        }} 
      />

      {/* Content */}
      <div className="relative flex flex-col justify-center h-full text-white" style={{ zIndex: 2, padding: '3vw 4vw', width: '50%' }}>
        <div className="uppercase font-medium" style={{ fontSize: '0.8vw', letterSpacing: '0.05em', marginBottom: '1.5vw', opacity: 0.9 }}>
          UPCOMING EVENT
        </div>

        <h2 className="font-semibold leading-tight" style={{ fontSize: '2.2vw', marginBottom: '2vw', maxWidth: '35vw' }}>
          Navigating market volatility: Strategies for family portfolios
        </h2>

        <div className="flex flex-col" style={{ gap: '1vw', marginBottom: '2.5vw' }}>
          <div className="flex items-center" style={{ gap: '0.8vw', fontSize: '0.9vw', opacity: 0.9 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.2vw', height: '1.2vw' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Wednesday, 12 June 2026
          </div>
          <div className="flex items-center" style={{ gap: '0.8vw', fontSize: '0.9vw', opacity: 0.9 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.2vw', height: '1.2vw' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            4:00-5:00 PM
          </div>
          <div className="flex items-center" style={{ gap: '0.8vw', fontSize: '0.9vw', opacity: 0.9 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.2vw', height: '1.2vw' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Virtual event
          </div>
        </div>

        <div>
          <button className="inline-flex items-center text-white bg-transparent hover:bg-white/10 transition-colors cursor-pointer" style={{ gap: '0.6vw', padding: '0.6vw 1.5vw', border: '0.1vw solid rgba(255,255,255,0.6)', borderRadius: '2vw', fontSize: '0.85vw' }}>
            REGISTER NOW
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.2vw', height: '1.2vw' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
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
