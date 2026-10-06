import { BookOpen, Forward, Lightbulb, Users } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import styles from './About.module.css';

// Same colour run as the home page's Community Pulse boxes.
const offers = [
  { Icon: BookOpen, title: 'Learn from real practice', bg: '#3A97FF', text: 'Explore accounting workflows, reconciliation approaches, compliance considerations and proven practices shared by experts and peers.' },
  { Icon: Lightbulb, title: 'Get more from AV', bg: '#1D79E0', text: 'Access practical guides, tutorials, training and product knowledge that help you work more effectively with Asset Vantage.' },
  { Icon: Users, title: 'Learn from the community', bg: '#003ECF', text: 'See how other family offices and finance teams approach reporting, operations and complex workflows.' },
  { Icon: Forward, title: 'Participate and contribute', bg: '#5600CF', text: 'Join discussions, attend sessions, respond to polls and share the experience you have built in your own work.' }
];

// "What you can do here": four coloured cards, each with an icon and a line.
export function OfferCards() {
  return (
    <section className={styles.card}>
      <Reveal as="h2" className={styles.sectionTitle}>What you can do here</Reveal>
      <Reveal stagger={150} className={styles.offerGrid}>
        {offers.map(({ Icon, title, bg, text }) => (
          <div key={title} className={styles.offer} style={{ backgroundColor: bg }}>
            <div className={styles.offerHead}>
              <span className={styles.iconCircle}><Icon strokeWidth={1.3} aria-hidden="true" /></span>
              <h3 className={styles.offerTitle}>{title}</h3>
            </div>
            <p className={styles.offerText}>{text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
