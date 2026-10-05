'use client';

import { useState, useCallback } from 'react';
import styles from './Events.module.css';

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

export default function EventsHeroBanner({ onFilterChange, onRegister }) {
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
    <div className={`relative overflow-hidden ${styles.hero}`}>
      {/* Background Image with transition */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(21, 75, 175, 0.95) 0%, rgba(21, 75, 175, 0.8) 40%, rgba(0,0,0,0) 100%), url('${slide.image}')`,
          zIndex: 1
        }}
      />
      <div className={styles.heroShade} aria-hidden />

      {/* Left Content */}
      <div className={`relative flex flex-col justify-center h-full text-white ${styles.heroContent}`} style={{ zIndex: 2 }}>
        <div className={`uppercase font-medium ${styles.heroLabel}`}>
          {slide.label}
        </div>

        <h2 className={`font-semibold leading-tight transition-all duration-500 ${styles.heroTitle}`}>
          {slide.title}
        </h2>

        <div className={`flex flex-col ${styles.heroMeta}`}>
          {[slide.date, slide.time, slide.location].map((text, i) => (
            <div key={i} className={`flex items-center ${styles.heroMetaItem}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.heroIcon}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {text}
            </div>
          ))}
        </div>

        <div>
          <button type="button" onClick={() => onRegister?.(slides[currentSlide].title)} className={`inline-flex items-center text-white bg-transparent hover:bg-white/10 transition-colors cursor-pointer ${styles.registerBtn}`}>
            REGISTER NOW
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.heroIcon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Explore Events Dropdown */}
      <div className={`absolute ${styles.explore}`}>
        {/* Dropdown trigger */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`w-full bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${styles.exploreTrigger} ${dropdownOpen ? styles.exploreTriggerOpen : ''}`}
        >
          <div className={`flex flex-col items-start ${styles.exploreLabels}`}>
            <span className={`font-semibold text-[#9ca3af] uppercase ${styles.exploreLabel}`}>EXPLORE EVENTS</span>
            <span className={`font-medium text-[#00A4E4] ${styles.exploreValue}`}>{activeFilter}</span>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            className={`transition-transform duration-200 ${styles.exploreChevron}`}
            style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className={`w-full bg-white overflow-hidden ${styles.exploreMenu}`}>
            {filters.map((f) => (
              <div
                key={f}
                onClick={() => handleFilter(f)}
                className={`flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${styles.exploreItem}`}
                style={{ color: activeFilter === f ? '#00A4E4' : '#132742' }}
              >
                <span className="font-medium">{f}</span>
                {activeFilter === f && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00A4E4" strokeWidth="2.5" className={styles.exploreCheck}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide indicators */}
      <div className={`absolute flex items-center ${styles.dots}`}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Show event ${i + 1}`}
            className={`rounded-full cursor-pointer transition-all duration-300 ${styles.dot} ${currentSlide === i ? styles.dotActive : ''}`}
            style={{ backgroundColor: currentSlide === i ? '#00A4E4' : 'rgba(255,255,255,0.5)' }}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className={`absolute flex ${styles.arrows}`}>
        <button onClick={goPrev} aria-label="Previous event" className={`rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer ${styles.arrow}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={goNext} aria-label="Next event" className={`rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer ${styles.arrow}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
