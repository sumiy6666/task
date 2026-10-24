import { Reveal } from '@/components/ui/Reveal';
import styles from './Join.module.css';

// Same colour run as the About page's cards and the home page's Community Pulse.
const voices = [
  { bg: '#3A97FF', text: 'I used to hear what other family offices were doing months later, if at all. Now it’s one conversation away.', by: ['Head of Finance', 'Single Family Office', 'Mumbai'] },
  { bg: '#1D79E0', text: 'Most forums want to sell you something. This one makes you better at your job.', by: ['CFO', 'Family Office', 'Delhi'] },
  { bg: '#003ECF', text: 'The polls are my favourite part. Ten seconds to answer, and I know where I stand.', by: ['Investment Lead', 'Multi-Family Office', 'Bengaluru'] },
  { bg: '#5600CF', text: 'Good people, honest conversations, zero fluff. It’s the one group I actually show up for.', by: ['Principal', 'Family Office', 'Singapore'] },
];

// The block quote mark at the top of each card.
const QuoteMark = ({ className }) => (
  <svg viewBox="0 0 71 53" className={className} aria-hidden="true">
    <path d="M0 25L12 0H28L17 24H29V53H0Z M42 25L54 0H70L59 24H71V53H42Z" />
  </svg>
);

// "Why you should join", in members' own words.
export function MemberVoices() {
  return (
    <section className={`${styles.panel} ${styles.voices}`}>
      <Reveal as="h2" className={styles.sectionTitle}>Why you should join</Reveal>
      <Reveal stagger={150} className={styles.quoteGrid}>
        {voices.map((v) => (
          <figure key={v.text} className={styles.quote} style={{ backgroundColor: v.bg }}>
            <QuoteMark className={styles.quoteMark} />
            <blockquote className={styles.quoteText}>{v.text}</blockquote>
            <figcaption className={styles.quoteBy}>
              {v.by.map((line, i) => (
                <span key={line} style={{ display: 'block' }}>{line}{i < v.by.length - 1 ? ',' : ''}</span>
              ))}
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
