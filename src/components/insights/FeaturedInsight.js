'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const bannerSlides = [
  {
    id: 'featured-1',
    title: 'Family offices and impact: Investing with purpose',
    description: 'How family offices are aligning capital with values to drive meaningful change.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop',
    readTime: '10 min',
    author: {
      name: 'Poonam Shah',
      avatar: 'https://i.pravatar.cc/100?img=5',
    },
    timeAgo: '2h ago',
    category: 'Investment Insights'
  },
  {
    id: 'featured-2',
    title: 'The evolving landscape of family office governance',
    description: 'Exploring the latest frameworks for multi-generational wealth management.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    readTime: '8 min',
    author: {
      name: 'Arvind Rajan',
      avatar: 'https://i.pravatar.cc/100?img=11',
    },
    timeAgo: '1d ago',
    category: 'Governance'
  },
];

const categories = [
  'Reporting and Accounting',
  'Practice Operations',
  'Structures and Cross-Border',
  'Allocation Trends',
  'Technology and AI'
];

export function FeaturedInsight({ article }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  const currentBanner = bannerSlides[currentSlide];

  return (
    <div className="relative overflow-visible" style={{ borderRadius: '1.1vw', marginBottom: '1.5vw', boxShadow: '0 0.3vw 1.5vw rgba(0,0,0,0.05)' }}>
      {/* Main Banner Section - full width */}
      <div className="relative overflow-hidden" style={{ minHeight: '28vw', borderRadius: '1.1vw' }}>
        {/* Background layers for smooth crossfade */}
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 50, 150, 0.9) 0%, rgba(0, 50, 150, 0.4) 60%, rgba(0,0,0,0) 100%), url(${slide.image})`,
              opacity: currentSlide === index ? 1 : 0,
              visibility: currentSlide === index ? 'visible' : 'hidden',
              zIndex: 1,
              transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out',
            }}
          />
        ))}

        {/* Content */}
        <div className="relative flex flex-col justify-center h-full text-white" style={{ zIndex: 2, padding: '2vw 2.5vw' }}>
          <div className="uppercase font-medium" style={{ fontSize: '0.65vw', letterSpacing: '0.1em', marginBottom: '1.5vw' }}>
            FEATURED ARTICLE
          </div>

          <h2 className="font-semibold leading-tight" style={{ fontSize: '1.8vw', marginBottom: '0.6vw', maxWidth: '30vw' }}>
            {currentBanner.title}
          </h2>

          <p className="leading-relaxed" style={{ fontSize: '0.75vw', opacity: 0.9, marginBottom: '1.2vw', maxWidth: '28vw' }}>
            {currentBanner.description}
          </p>

          <div className="flex items-center" style={{ gap: '0.4vw', marginBottom: '1.2vw', fontSize: '0.65vw', opacity: 0.8 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1vw', height: '1vw' }}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            {currentBanner.readTime} read
          </div>

          <div className="flex items-center" style={{ gap: '0.8vw', marginBottom: '1.5vw' }}>
            <img src={currentBanner.author.avatar} alt={currentBanner.author.name} className="rounded-full object-cover" style={{ width: '3vw', height: '3vw', border: '0.15vw solid rgba(255,255,255,0.2)' }} />
            <div>
              <div className="font-semibold" style={{ fontSize: '0.9vw' }}>{currentBanner.author.name}</div>
              <div style={{ fontSize: '0.65vw', opacity: 0.8 }}>
                {currentBanner.timeAgo} &nbsp;|&nbsp; {currentBanner.category}
              </div>
            </div>
          </div>

          <div>
            <Link href={`/insights/${currentBanner.id}`} className="inline-flex items-center text-white no-underline hover:bg-white/10 transition-all" style={{ gap: '0.4vw', padding: '0.4vw 1.2vw', border: '0.07vw solid rgba(255,255,255,0.5)', borderRadius: '2vw', fontSize: '0.7vw' }}>
              READ MORE
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1vw', height: '1vw' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute flex" style={{ bottom: '1.2vw', right: '1.2vw', gap: '0.4vw', zIndex: 10 }}>
          <button
            onClick={prevSlide}
            className="rounded-full text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
            style={{ width: '2.5vw', height: '2.5vw', backgroundColor: '#00A4E4', boxShadow: '0 0.2vw 0.6vw rgba(0,0,0,0.25)' }}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '1.1vw', height: '1.1vw' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="rounded-full text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
            style={{ width: '2.5vw', height: '2.5vw', backgroundColor: '#00A4E4', boxShadow: '0 0.2vw 0.6vw rgba(0,0,0,0.25)' }}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '1.1vw', height: '1.1vw' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Categories Dropdown - overlapping on the right side of the banner */}
      <div
        className="absolute bg-white flex flex-col overflow-hidden"
        style={{ top: '1.5vw', right: '1.5vw', width: '16vw', borderRadius: '0.8vw', boxShadow: '0 0.4vw 1.2vw rgba(0,0,0,0.15)', zIndex: 15 }}
        ref={dropdownRef}
      >
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex flex-col text-left w-full cursor-pointer bg-white transition-colors border-none"
          style={{ padding: '0.8vw 1.2vw' }}
        >
          <span className="font-semibold text-gray-800 uppercase tracking-wide" style={{ fontSize: '0.65vw', marginBottom: '0.4vw' }}>
            CATEGORIES
          </span>
          <div className="flex items-center justify-between w-full">
            <span className="font-medium text-[#0056b3]" style={{ fontSize: '0.9vw' }}>
              {selectedCategory}
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="#00A4E4" strokeWidth="2" style={{ width: '1.1vw', height: '1.1vw', transition: 'transform 0.2s', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        {isDropdownOpen && (
          <div className="bg-white flex flex-col border-t border-gray-100">
            {categories.filter(c => c !== selectedCategory).map((cat, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left font-medium text-gray-800 hover:text-[#00A4E4] bg-white hover:bg-blue-50 transition-colors cursor-pointer border-none"
                style={{ padding: '0.8vw 1.2vw', fontSize: '0.8vw', borderBottom: index < categories.length - 2 ? '0.05vw solid #f0f0f0' : 'none' }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
