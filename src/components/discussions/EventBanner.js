import React from 'react';
import Link from 'next/link';

export function EventBanner() {
  return (
    <div className="relative overflow-hidden" style={{ borderRadius: 'calc(1.2 * var(--sa))', marginBottom: 'calc(2 * var(--sa))', minHeight: 'calc(30 * var(--da) + var(--db))', boxShadow: '0 calc(0.4 * var(--sa)) calc(1.5 * var(--sa)) rgba(0,0,0,0.1)' }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(21, 75, 175, 0.95) 0%, rgba(21, 75, 175, 0.8) 40%, rgba(0,0,0,0) 100%), url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop')`,
          zIndex: 1
        }} 
      />

      {/* Content */}
      <div className="relative flex flex-col justify-center h-full text-white" style={{ zIndex: 2, padding: 'calc(3 * var(--sa)) calc(4 * var(--sa))', width: 'var(--split)' }}>
        <div className="uppercase font-medium" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))', letterSpacing: '0.05em', marginBottom: 'calc(1.5 * var(--sa))', opacity: 0.9 }}>
          UPCOMING EVENT
        </div>

        <h2 className="font-semibold leading-tight" style={{ fontSize: 'calc(2.2 * var(--fa) + var(--fb))', marginBottom: 'calc(2 * var(--sa))', maxWidth: 'calc(35 * var(--da) + var(--db))' }}>
          Navigating market volatility: Strategies for family portfolios
        </h2>

        <div className="flex flex-col" style={{ gap: 'calc(1 * var(--sa))', marginBottom: 'calc(2.5 * var(--sa))' }}>
          <div className="flex items-center" style={{ gap: 'calc(0.8 * var(--sa))', fontSize: 'calc(0.9 * var(--fa) + var(--fb))', opacity: 0.9 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1.2 * var(--da) + var(--db))', height: 'calc(1.2 * var(--da) + var(--db))' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Wednesday, 12 June 2026
          </div>
          <div className="flex items-center" style={{ gap: 'calc(0.8 * var(--sa))', fontSize: 'calc(0.9 * var(--fa) + var(--fb))', opacity: 0.9 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1.2 * var(--da) + var(--db))', height: 'calc(1.2 * var(--da) + var(--db))' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            4:00-5:00 PM
          </div>
          <div className="flex items-center" style={{ gap: 'calc(0.8 * var(--sa))', fontSize: 'calc(0.9 * var(--fa) + var(--fb))', opacity: 0.9 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1.2 * var(--da) + var(--db))', height: 'calc(1.2 * var(--da) + var(--db))' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Virtual event
          </div>
        </div>

        <div>
          <Link href="/events" className="inline-flex items-center text-white bg-transparent hover:bg-white/10 transition-colors cursor-pointer" style={{ gap: 'calc(0.6 * var(--sa))', padding: 'calc(0.6 * var(--sa)) calc(1.5 * var(--sa))', border: 'calc(0.1 * var(--sa)) solid rgba(255,255,255,0.6)', borderRadius: 'calc(2 * var(--sa))', fontSize: 'calc(0.85 * var(--fa) + var(--fb))' }}>
            REGISTER NOW
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1.2 * var(--da) + var(--db))', height: 'calc(1.2 * var(--da) + var(--db))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
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
