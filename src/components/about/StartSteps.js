import { Reveal } from '@/components/ui/Reveal';
import styles from './About.module.css';

const steps = [
  { title: 'Introduce yourself', text: 'Join the New Members conversation and say hello.' },
  { title: 'Follow what matters', text: 'Choose the topics most relevant to your role and interests.' },
  { title: 'Explore the guides', text: 'Start with practical AV guides, articles and learning resources.' },
  { title: 'Join the conversation', text: 'Reply to a discussion, vote in a poll or start one of your own.' }
];

// "New here?": four numbered first steps.
export function StartSteps() {
  return (
    <section className={styles.card}>
      <Reveal as="h2" className={styles.sectionTitle}>New here? Start with these four things.</Reveal>
      <Reveal stagger={150} as="ol" className={styles.steps}>
        {steps.map((step, i) => (
          <li key={step.title}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
            </div>
            <p className={styles.stepText}>{step.text}</p>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
