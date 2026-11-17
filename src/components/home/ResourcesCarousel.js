import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Carousel } from '../ui/Carousel';
import { Reveal } from '../ui/Reveal';
import styles from './ResourcesCarousel.module.css';

// Fixed cards (not from the forum): Posts and Articles open the Insights
// page, Polls opens the Poll page.
const resources = [
  { tag: 'Posts', title: 'Short updates and perspectives curated by the Asset Vantage team.', image: '/images/resource-insight.jpg', href: '/insights' },
  { tag: 'Articles', title: 'In-depth reads on family office accounting, performance, operations and technology.', image: '/images/resource-article.jpg', href: '/insights' },
  { tag: 'Polls', title: 'Weigh in and see how your peers approach key decisions.', image: '/images/resource-poll.jpg', href: '/poll' },
];

export function ResourcesCarousel() {

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
