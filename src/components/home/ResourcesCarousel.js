import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Carousel } from '../ui/Carousel';
import { Reveal } from '../ui/Reveal';
import styles from './ResourcesCarousel.module.css';

const FALLBACK_IMAGES = ['/images/feature1.jpg', '/images/trend1.jpg', '/images/herobanner2.jpg', '/images/herobanner1.jpg'];

const SAMPLE_RESOURCES = [
  { tag: 'Best Practices', title: 'Handbook on Philanthropy', image: '/images/feature1.jpg', href: '/insights' },
  { tag: 'Insights', title: 'The Future of family governance: Principles for sustainable legacy', image: '/images/trend1.jpg', href: '/insights' },
  { tag: 'Whitepaper', title: 'Security and Control in Wealth Tech', image: '/images/herobanner2.jpg', href: '/insights' },
  { tag: 'Insights', title: 'Consolidated reporting across custodians and asset classes', image: '/images/herobanner1.jpg', href: '/insights' },
];

// `resources` are the forum's latest articles; without them the samples show.
export function ResourcesCarousel({ resources: live }) {
  const resources = live?.length
    ? live.map((r, i) => ({ ...r, image: r.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length] }))
    : SAMPLE_RESOURCES;

  return (
    <Carousel id="resources-title" title="RESOURCES" headerClassName={styles.header}>
      {resources.map((item, index) => (
        <Reveal key={index} delay={(index % 3) * 150} className={styles.cell}>
          <article className={styles.card} style={{ backgroundImage: `url('${item.image}')` }}>
            <div className={styles.overlay} aria-hidden="true" />
            <div className={styles.content}>
              <span className={styles.tag}>{item.tag}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
            </div>
            <Link prefetch={false} href={item.href} className={styles.readBtn}>
              READ <ArrowRight size={16} aria-hidden="true" />
              <span className="sr-only">: {item.title}</span>
            </Link>
          </article>
        </Reveal>
      ))}
    </Carousel>
  );
}
