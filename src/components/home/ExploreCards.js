import React from 'react';
import { Card } from '../ui/Card';
import styles from './ExploreCards.module.css';

export function ExploreCards() {
  const cards = [
    {
      title: 'Best practices',
      desc: 'Proven strategies and practical frameworks from the community.',
      variant: 'primary',
      icon: <img src="/images/Icon1.svg" alt="Best practices" style={{ width: '40px', height: '40px' }} />,
      bg: '#003ECF'
    },
    {
      title: 'Insights',
      desc: 'Curated articles, research and expert insights on key topics.',
      variant: 'purple',
      icon: <img src="/images/Icon2.svg" alt="Insights" style={{ width: '40px', height: '40px' }} />,
      bg: '#5600CF'
    },
    {
      title: 'Polls',
      desc: 'Share your views and see what the community thinks.',
      variant: 'pink',
      icon: <img src="/images/Icon3.svg" alt="Polls" style={{ width: '40px', height: '40px' }} />,
      bg: '#9400CF'
    }
  ];

  return (
    <Card className={styles.exploreContainer}>
      <h3 className={styles.title}>EXPLORE THE COMMUNITY</h3>
      <div className={styles.cardsList}>
        {cards.map((card, index) => (
          <Card key={index} variant={card.variant} className={styles.exploreCard} style={{ backgroundColor: card.bg }}>
            <div className={styles.cardContent}>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </div>
            <div className={styles.cardIcon}>
              {card.icon}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
