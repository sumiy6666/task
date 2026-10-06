import Link from 'next/link';
import styles from './PageHero.module.css';

const ArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// A rounded photo banner with a blue wash on the left: label, title, optional
// text, then either `actions` (link buttons) or custom `children` (e.g. poll
// answers). The text fades up one line after another on load.
//
// actions: [{ label, href, variant: 'outline' | 'solid', arrow }]
export function PageHero({
  image,
  label,
  title,
  titleWidth,
  text,
  actions = [],
  children,
  arrows = false,
  spacious = false,
  compact = false,
  framed = false,
  // wash = 'linear-gradient(to right, rgba(21, 75, 200, 0.92) 0%, rgba(21, 75, 200, 0.75) 33%, rgba(21, 75, 200, 0) 58%)'
 wash = 'linear-gradient(to right, rgba(21, 75, 200, 0) 0%, rgba(21, 75, 200, 0) 33%, rgba(21, 75, 200, 0) 58%)'
  
}) {
  const delay = (step) => ({ '--delay': `${step * 0.15}s` });
  let step = 0;

  return (
    <section className={`${styles.hero} ${spacious ? styles.spacious : ''} ${compact ? styles.compact : ''} ${framed ? styles.framed : ''}`} style={{ backgroundImage: framed ? `url('${image}')` : `${wash}, url('${image}')` }}>
      <div className={styles.content}>
        {label && <div className={`rise-in ${styles.label}`} style={delay(step++)}>{label}</div>}

        <h1 className={`rise-in ${styles.title}`} style={{ ...delay(step++), '--title-width': titleWidth }}>{title}</h1>

        {text && <p className={`rise-in ${styles.text}`} style={delay(step++)}>{text}</p>}

        {actions.length > 0 && (
          <div className={`rise-in ${styles.actions}`} style={delay(step++)}>
            {actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`${styles.button} ${action.variant === 'solid' ? styles.solid : styles.outline} ${actions.length === 1 ? styles.single : ''}`}
              >
                {action.label}
                {action.arrow && <ArrowRight />}
              </Link>
            ))}
          </div>
        )}

        {children}
      </div>

      {arrows && (
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} aria-label="Previous">
            <ArrowRight style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button type="button" className={styles.arrow} aria-label="Next">
            <ArrowRight />
          </button>
        </div>
      )}
    </section>
  );
}
