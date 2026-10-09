'use client';
import React, { useState, useEffect } from 'react';
import styles from './HeroBanner.module.css';
import { Button } from '../ui/Button';
import { ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';

const bannerData = [
  {
    image: '/images/herobanner1.jpg',
    tag: 'FEATURED',
    title: 'The engagement letter decides what the family keeps',
    desc: 'Under the AICPA Code, working papers stay with the firm unless a contract says otherwise. Most letters say nothing.',
    buttonText: 'LEARN',
    href: '/insights'
  },
  {
    image: '/images/herobanner2.jpg',
    tag: 'TRENDING',
    title: "GIFT City's family fund route is open",
    desc: 'Three years after the framework arrived, the first full registration went to a foreign structure.',
    buttonText: 'READ',
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
  }, [currentSlide]);

  const nextSlide = () => goTo((prev) => (prev + 1) % bannerData.length);
  const prevSlide = () => goTo((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeText}>
          <h1 className="rise-in">Welcome to <span className={styles.highlight}>AV COMMUNITY</span></h1>
          <p className="rise-in" style={{ '--delay': '0.15s' }}>Connect, learn and grow with professionals around the world.</p>
        </div>
        <div className={`${styles.welcomeActions} rise-in`} style={{ '--delay': '0.3s' }}>
          <Button href="/conversations/new" variant="secondary" icon={<MessageSquare size={18} strokeWidth={1.5} />} iconPosition="left" className={styles.discussionBtn}>
            START A DISCUSSION
          </Button>
          <Button href="/discussions" variant="primary" icon={<ArrowRight size={16} />} iconPosition="right" className={styles.dashboardBtn}>
            MY DASHBOARD
          </Button>
        </div>
      </div>

      <div className={styles.featuredBanner}>
        {bannerData.map((banner, index) => (
          <div
            key={index}
            className={styles.bannerBackground}
            style={{
              backgroundImage: `linear-gradient(100deg, rgba(10, 30, 92, 0.92) 0%, rgba(12, 30, 70, 0.6) 35%, rgba(12, 43, 74, 0) 65%), url('${banner.image}')`,
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

        <div className={styles.bannerFooter}>
          <div
            key={`btn-${currentSlide}`}
            className="rise-in"
            style={{ '--base': hasSlid ? '0.3s' : '0.6s', '--delay': '0.45s' }}
          >
            <Button href={bannerData[currentSlide].href} variant="outline" icon={<ArrowRight size={16} />} iconPosition="right" className={styles.learnMoreBtn}>
              {bannerData[currentSlide].buttonText}
            </Button>
          </div>

          <div className={styles.bannerControls}>
            <button className={styles.navBtn} aria-label="Previous slide" onClick={prevSlide}>
              <ArrowLeft size={14} />
            </button>
            <button className={styles.navBtn} aria-label="Next slide" onClick={nextSlide}>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
