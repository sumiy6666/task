'use client';
import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import styles from './TrendingCard.module.css';
import { ArrowRight } from 'lucide-react';

const tabs = [
  { id: 'trending', icon: '/images/Trending.svg', title: "GIFT City's family fund route is open, and mostly unused by Indian families", desc: "Three years after the framework arrived, the first full registration went to a foreign structure. Indian families are still routing through Category III AIFs.", image: '/images/feature1.jpg' },
  { id: 'mostactive', icon: '/images/MostActive.svg', title: "Most active discussions this week", desc: "A look at what the community is talking about right now.", image: '/images/herobanner1.jpg' },
  { id: 'latest', icon: '/images/LatestUpdates.svg', title: "Latest updates on platform features", desc: "Discover the new tools we've added to help you manage your family office better.", image: '/images/feature1.jpg' },
  { id: 'insight', icon: '/images/Insight.svg', title: "Insight into upcoming tax regulations", desc: "Prepare your family office for the 2026 tax changes.", image: '/images/herobanner1.jpg' },
  { id: 'polls', icon: '/images/RecentPolls.svg', title: "Recent polls on asset allocation", desc: "See how other family offices are adjusting their portfolios.", image: '/images/feature1.jpg' }
];

export function TrendingCard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card className={styles.trendingCard} style={{ backgroundImage: `linear-gradient(to bottom, #003ECF 0%, rgba(150, 196, 243, 0) 50%, rgba(12, 43, 74, 0) 100%), url('${tabs[activeTab].image}')` }}>
      <div className={styles.sidebar}>
        <div className={styles.navIcons}>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              className={`${styles.navIcon} ${activeTab === index ? styles.active : ''}`}
              onClick={() => setActiveTab(index)}
              aria-label={tab.id}
            >
              <img src={tab.icon} alt={tab.id} style={{ width: '24px', height: '24px', filter: activeTab === index ? 'brightness(0) invert(1)' : 'none' }} />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.tag}>TRENDING</span>
          <Button variant="outline" size="sm" icon={<ArrowRight size={16} />} iconPosition="right" className={styles.readMoreBtn} style={{ background: 'transparent', border: '1px solid white', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', padding: '0.1rem 0.3rem 0.1rem 1rem', borderRadius: '24px', fontSize: '11px' }}>
            READ MORE
          </Button>
        </div>

        <h2 className={styles.title}>{tabs[activeTab].title}</h2>
        <p className={styles.desc}>{tabs[activeTab].desc}</p>

        <button
          className={styles.nextBtn}
          aria-label="Next"
          onClick={() => setActiveTab((activeTab + 1) % tabs.length)}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </Card>
  );
}
