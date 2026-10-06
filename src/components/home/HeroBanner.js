'use client';
import React, { useState, useEffect } from 'react';
import styles from './HeroBanner.module.css';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const bannerData = [
  {
    image: '/images/herobanner1.jpg',
    tag: 'FEATURED',
    title: 'The engagement letter decides what the family keeps',
    desc: 'Under the AICPA Code, working papers stay with the firm unless a contract says otherwise. Most letters say nothing.',
    buttonText: 'LEARN MORE',
    href: '/insights'
  },
  {
    image: '/images/herobanner1.jpg',
    tag: 'TRENDING',
    title: "GIFT City's family fund route is open",
    desc: 'Three years after the framework arrived, the first full registration went to a foreign structure.',
    buttonText: 'READ ARTICLE',
    href: '/insights'
  }
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // The first slide's text waits for the welcome heading; later slides don't.
  const [hasSlid, setHasSlid] = useState(false);

  const goTo = (getNext) => {
    setHasSlid(true);
    setCurrentSlide(getNext);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHasSlid(true);
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => goTo((prev) => (prev + 1) % bannerData.length);
  const prevSlide = () => goTo((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeText}>
          <h1 className="rise-in">Welcome to <span className={styles.highlight}>AV COMMUNITY</span></h1>
          <p className="rise-in" style={{ '--delay': '0.15s' }}>Connect, learn and grow with professionals around the world.</p>
        </div>
        <div className={styles.welcomeActions}>
          <Button href="/conversations/new" variant="secondary" icon={<img src="/images/banner_conversation.svg" alt="conversation" style={{ width: '16px', height: '16px' }} />} iconPosition="left" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid #ccc', color: '#555', padding: '0.3vw 1.5vw', borderRadius: '24px', fontSize: '11px' }}>
            START A CONVERSATION
          </Button>
          <Button href="/discussions" variant="primary" icon={<ArrowRight size={16} />} iconPosition="right" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#00A4E4', color: 'white', padding: '0.3vw 1.5vw', borderRadius: '24px', border: 'none', fontSize: '11px' }}>
            LEARN MORE
          </Button>
        </div>
      </div>

      <div className={styles.featuredBanner}>
        {bannerData.map((banner, index) => (
          <div
            key={index}
            className={styles.bannerBackground}
            style={{
              backgroundImage: `linear-gradient(to right, rgb(0, 62, 207, 0.3) 0%, rgba(12, 43, 74, 0.5) 40%, rgba(12, 43, 74, 0) 70%), url('${banner.image}')`,
              opacity: currentSlide === index ? 1 : 0,
              visibility: currentSlide === index ? 'visible' : 'hidden',
            }}
          />
        ))}

        {/* Keyed by slide so the text animates in again on every change. */}
        <div key={currentSlide} className={styles.bannerContent} style={{ '--base': hasSlid ? '0.3s' : '0.6s' }}>
          <span className={`${styles.featuredTag} rise-in`}>{bannerData[currentSlide].tag}</span>
          <h2 className="rise-in" style={{ '--delay': '0.15s' }}>{bannerData[currentSlide].title}</h2>
          <p className="rise-in" style={{ '--delay': '0.3s' }}>
            {bannerData[currentSlide].desc}
          </p>
        </div>

        <div
          key={`btn-${currentSlide}`}
          className={`${styles.learnMoreBtnWrapper} rise-in`}
          style={{ '--base': hasSlid ? '0.3s' : '0.6s', '--delay': '0.45s' }}
        >
          <Button href={bannerData[currentSlide].href} variant="outline" icon={<ArrowRight size={16} />} iconPosition="right" className={styles.learnMoreBtn} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid white', color: 'white', padding: '0.3rem 1.2rem', borderRadius: '24px', fontSize: '12px' }}>
            {bannerData[currentSlide].buttonText}
          </Button>
        </div>

        <div className={styles.bannerControls}>
          <button className={styles.navBtn} aria-label="Previous" onClick={prevSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button className={styles.navBtn} aria-label="Next" onClick={nextSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className={styles.userBadge}>
          <div className={styles.headphoneIcon}>
            <img src="/images/icon1coversation.svg" alt="Conversations" style={{ width: '38px', height: '38px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
