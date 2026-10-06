'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const bannerSlides = [
  {
    id: 'featured-1',
    title: 'Family offices and impact: Investing with purpose',
    description: 'How family offices are aligning capital with values to drive meaningful change.',
    image: '/images/aboutbanner.png',
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
    image: '/images/aboutbanner.png',
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

export function FeaturedInsight({ slides }) {
  // Live articles keep the designed banner photo, so the white text stays readable.
  const banners = slides?.length ? slides.map((slide) => ({ ...slide, image: bannerSlides[0].image })) : bannerSlides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  const currentBanner = banners[currentSlide];

  return (
    <div className="relative overflow-visible" style={{ borderRadius: 'calc(1.1 * var(--sa))', marginBottom: 'calc(1.5 * var(--sa))', boxShadow: '0 calc(0.3 * var(--sa)) calc(1.5 * var(--sa)) rgba(0,0,0,0.05)' }}>
      {/* Main Banner Section - full width */}
      <div className="relative overflow-hidden" style={{ minHeight: 'calc(33.4 * var(--da) + var(--db))', borderRadius: 'calc(1.6 * var(--sa))' }}>
        {/* Background layers for smooth crossfade */}
        {banners.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 50, 150, 0) 0%, rgba(0, 50, 150, 0) 60%, rgba(0,0,0,0) 100%), url(${slide.image})`,
              opacity: currentSlide === index ? 1 : 0,
              visibility: currentSlide === index ? 'visible' : 'hidden',
              zIndex: 1,
              transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out',
            }}
          />
        ))}

        {/* Content */}
        {/* On phones the Categories box sits above the text, so start the text below it. */}
        {/* Keyed by slide so the text animates in one by one on every change. */}
        <div key={currentSlide} className="relative flex flex-col justify-center h-full text-white max-sm:pt-[96px]!" style={{ zIndex: 2, padding: 'calc(3 * var(--sa)) calc(2.7 * var(--sa))' }}>
          <div className="rise-in uppercase" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))', fontWeight: 500, letterSpacing: '0.02em', marginBottom: 'calc(1.6 * var(--sa))' }}>
            FEATURED ARTICLE
          </div>

          <h2 className="rise-in" style={{ '--delay': '0.15s', fontSize: 'calc(2.3 * var(--fa) + var(--fb))', fontWeight: 400, lineHeight: 1.35, marginBottom: 'calc(1.4 * var(--sa))', maxWidth: 'calc(27 * var(--da) + var(--db))' }}>
            {currentBanner.title}
          </h2>

          <p className="rise-in" style={{ '--delay': '0.3s', fontSize: 'calc(1.1 * var(--fa) + var(--fb))', fontWeight: 300, lineHeight: 1.45, opacity: 0.95, marginBottom: 'calc(1.6 * var(--sa))', maxWidth: 'calc(20.5 * var(--da) + var(--db))' }}>
            {currentBanner.description}
          </p>

          {currentBanner.readTime && (
            <div className="rise-in flex items-center" style={{ '--delay': '0.45s', gap: 'calc(1.15 * var(--sa))', marginBottom: 'calc(1.8 * var(--sa))', fontSize: 'calc(1 * var(--fa) + var(--fb))', fontWeight: 300 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 'calc(1.1 * var(--da) + var(--db))', height: 'calc(1.1 * var(--da) + var(--db))' }}>
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              {currentBanner.readTime} read
            </div>
          )}

          <div className="rise-in flex items-center" style={{ '--delay': '0.6s', gap: 'calc(1.3 * var(--sa))', marginBottom: 'calc(2 * var(--sa))' }}>
            <img src={currentBanner.author.avatar} alt={currentBanner.author.name} className="rounded-full object-cover" style={{ width: 'calc(3.75 * var(--da) + var(--db))', height: 'calc(3.75 * var(--da) + var(--db))', border: '2px solid rgba(255,255,255,0.85)' }} />
            <div>
              <div style={{ fontSize: 'calc(1.1 * var(--fa) + var(--fb))', fontWeight: 400, marginBottom: 'calc(0.2 * var(--sa))' }}>{currentBanner.author.name}</div>
              <div style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))', fontWeight: 300 }}>
                {currentBanner.timeAgo}<span style={{ margin: '0 calc(1.2 * var(--sa))' }}>|</span>{currentBanner.category}
              </div>
            </div>
          </div>

          <div className="rise-in" style={{ '--delay': '0.75s' }}>
            <Link href={`/insights/${currentBanner.id}`} className="inline-flex items-center text-white no-underline hover:bg-white/10 transition-all" style={{ gap: 'calc(0.9 * var(--sa))', height: 'calc(2.6 * var(--da) + var(--db))', padding: '0 calc(0.95 * var(--sa))', border: '1.5px solid rgba(255,255,255,0.9)', borderRadius: '999px', fontSize: 'calc(1.05 * var(--fa) + var(--fb))', fontWeight: 300 }}>
              READ MORE
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 'calc(1 * var(--da) + var(--db))', height: 'calc(1 * var(--da) + var(--db))' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute flex" style={{ bottom: 'calc(2.3 * var(--sa))', right: 'calc(3.2 * var(--sa))', gap: 'calc(0.6 * var(--sa))', zIndex: 10 }}>
          <button
            onClick={prevSlide}
            className="rounded-full text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
            style={{ width: 'calc(1.8 * var(--da) + var(--db))', height: 'calc(1.8 * var(--da) + var(--db))', backgroundColor: '#00A4E4' }}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1 * var(--da) + var(--db))', height: 'calc(1 * var(--da) + var(--db))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="rounded-full text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
            style={{ width: 'calc(1.8 * var(--da) + var(--db))', height: 'calc(1.8 * var(--da) + var(--db))', backgroundColor: '#00A4E4' }}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1 * var(--da) + var(--db))', height: 'calc(1 * var(--da) + var(--db))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Categories Dropdown - overlapping on the right side of the banner */}
      <div
        className="absolute bg-white flex flex-col overflow-hidden"
        style={{ top: 'calc(1.65 * var(--sa))', right: 'calc(2.1 * var(--sa))', minWidth: 'min(calc(16.4 * var(--da) + var(--db)), calc(100% - 4.2 * var(--sa)))', maxWidth: 'calc(100% - 4.2 * var(--sa))', borderRadius: 'calc(0.65 * var(--sa))', boxShadow: '0 calc(0.4 * var(--sa)) calc(1.2 * var(--sa)) rgba(0,0,0,0.15)', zIndex: 15 }}
        ref={dropdownRef}
      >
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex flex-col text-left w-full cursor-pointer bg-white transition-colors border-none"
          style={{ padding: 'calc(0.8 * var(--sa)) calc(1.2 * var(--sa))' }}
        >
          <span className="uppercase text-[#111]" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))', fontWeight: 400, marginBottom: 'calc(0.2 * var(--sa))' }}>
            CATEGORIES
          </span>
          <div className="flex items-center justify-between w-full">
            <span className="text-[#0056d6] whitespace-nowrap overflow-hidden text-ellipsis min-w-0" style={{ fontSize: 'calc(1.15 * var(--fa) + var(--fb))', fontWeight: 400, marginRight: 'calc(1 * var(--sa))' }}>
              {selectedCategory}
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="#0056d6" strokeWidth="1.5" style={{ width: 'calc(1.2 * var(--da) + var(--db))', height: 'calc(1.1 * var(--da) + var(--db))', transition: 'transform 0.2s', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
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
                style={{ padding: 'calc(0.8 * var(--sa)) calc(1.2 * var(--sa))', fontSize: 'calc(0.8 * var(--fa) + var(--fb))', borderBottom: index < categories.length - 2 ? 'calc(0.05 * var(--sa)) solid #f0f0f0' : 'none' }}
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
