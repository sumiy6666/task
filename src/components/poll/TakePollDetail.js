import { Reveal } from '@/components/ui/Reveal';
import styles from './Poll.module.css';

const letterLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export default function TakePollDetail({ poll }) {
  if (!poll) return null;

  return (
    <div className={`flex flex-col h-full ${styles.panel} ${styles.take}`}>
      <Reveal as="h3" className={styles.takeLabel}>TAKE POLL</Reveal>

      <Reveal as="h2" delay={120} className={styles.takeQuestion}>
        {poll.question}
      </Reveal>

      <Reveal stagger={120} delay={240} className={styles.takeOptions}>
        {poll.options.map((option, index) => (
          <div key={index} className={styles.takeOption}>
            <span className={styles.takeLetter}>{letterLabels[index]}</span>
            <span className={styles.takeText}>{option.label}</span>
            <span className={styles.takePct}>{option.percentage}</span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
