'use client';

import { useState, useCallback } from 'react';

const filters = ['Webinars', 'Roundtables', 'Community Sessions', 'Past Events'];

const slides = [
  {
    label: 'UPCOMING EVENT',
    title: 'Navigating market volatility: Strategies for family portfolios',
    date: 'Wednesday, 12 June 2026',
    time: '4:00-5:00 PM',
    location: 'Virtual event',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop'
  },
  {
    label: 'UPCOMING EVENT',
    title: 'Global Outlook 2024: Private Markets and alternatives',
    date: 'Wednesday, 18 June 2026',
    time: '11:00 AM - 12:30 PM',
    location: 'Virtual event',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop'
  },
  {
    label: 'UPCOMING EVENT',
    title: 'AI in family offices: Opportunities and risks',
    date: 'Wednesday, 21 June 2026',
    time: '4:00 PM - 5:30 PM',
    location: 'Webinar',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop'
  }
];

export default function EventsHeroBanner({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('Webinars');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleFilter = (f) => {
    setActiveFilter(f);
    setDropdownOpen(false);
    if (onFilterChange) onFilterChange(f);
  };

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative overflow-hidden" style={{ borderRadius: '1.2vw', marginBottom: '2vw', minHeight: '30vw', boxShadow: '0 0.4vw 1.5vw rgba(0,0,0,0.1)' }}>
      {/* Background Image with transition */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(21, 75, 175, 0.95) 0%, rgba(21, 75, 175, 0.8) 40%, rgba(0,0,0,0) 100%), url('${slide.image}')`,
          zIndex: 1
        }}
      />

      {/* Left Content */}
      <div className="relative flex flex-col justify-center h-full text-white" style={{ zIndex: 2, padding: '3vw 4vw', width: '50%' }}>
        <div className="uppercase font-medium" style={{ fontSize: '0.8vw', letterSpacing: '0.05em', marginBottom: '1.5vw', opacity: 0.9 }}>
          {slide.label}
        </div>

        <h2 className="font-semibold leading-tight transition-all duration-500" style={{ fontSize: '2.2vw', marginBottom: '2vw', maxWidth: '35vw' }}>
          {slide.title}
        </h2>

        <div className="flex flex-col" style={{ gap: '1vw', marginBottom: '2.5vw' }}>
          {[slide.date, slide.time, slide.location].map((text, i) => (
            <div key={i} className="flex items-center" style={{ gap: '0.8vw', fontSize: '0.9vw', opacity: 0.9 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.2vw', height: '1.2vw' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {text}
            </div>
          ))}
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

      {/* Explore Events Dropdown */}
      <div className="absolute" style={{ top: '2.5vw', right: '3vw', zIndex: 10, width: '15vw' }}>
        {/* Dropdown trigger */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          style={{ padding: '1vw 1.5vw', borderRadius: dropdownOpen ? '0.8vw 0.8vw 0 0' : '0.8vw', boxShadow: '0 0.4vw 1.5vw rgba(0,0,0,0.15)', border: 'none' }}
        >
          <div className="flex flex-col items-start" style={{ gap: '0.3vw' }}>
            <span className="font-semibold text-[#9ca3af] uppercase" style={{ fontSize: '0.6vw', letterSpacing: '0.08em' }}>EXPLORE EVENTS</span>
            <span className="font-medium text-[#00A4E4]" style={{ fontSize: '0.8vw' }}>{activeFilter}</span>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            className="transition-transform duration-200"
            style={{ width: '1vw', height: '1vw', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="w-full bg-white overflow-hidden" style={{ borderRadius: '0 0 0.8vw 0.8vw', boxShadow: '0 0.4vw 1.5vw rgba(0,0,0,0.15)' }}>
            {filters.map((f) => (
              <div
                key={f}
                onClick={() => handleFilter(f)}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ padding: '0.8vw 1.5vw', fontSize: '0.8vw', color: activeFilter === f ? '#00A4E4' : '#132742', borderTop: '1px solid #f3f4f6' }}
              >
                <span className="font-medium">{f}</span>
                {activeFilter === f && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00A4E4" strokeWidth="2.5" style={{ width: '1vw', height: '1vw' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide indicators */}
      <div className="absolute flex items-center" style={{ bottom: '2vw', left: '50%', transform: 'translateX(-50%)', gap: '0.5vw', zIndex: 10 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="rounded-full cursor-pointer transition-all duration-300"
            style={{
              width: currentSlide === i ? '2vw' : '0.5vw',
              height: '0.5vw',
              backgroundColor: currentSlide === i ? '#00A4E4' : 'rgba(255,255,255,0.5)',
              border: 'none'
            }}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute flex" style={{ bottom: '2vw', right: '2vw', gap: '0.5vw', zIndex: 10 }}>
        <button onClick={goPrev} className="rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer" style={{ width: '2.5vw', height: '2.5vw', backgroundColor: '#00A4E4', border: 'none', color: 'white' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '1.2vw', height: '1.2vw' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={goNext} className="rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer" style={{ width: '2.5vw', height: '2.5vw', backgroundColor: '#00A4E4', border: 'none', color: 'white' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '1.2vw', height: '1.2vw' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
