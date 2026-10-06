import styles from './Poll.module.css';

export default function PollResultCard({ question, options }) {
  return (
    <div className="flex flex-col w-full">
      <h3 className={styles.resultQuestion}>{question}</h3>
      <div className={styles.resultOptions}>
        {options.map((option, index) => (
          <div key={index} className={`${styles.resultOption} ${option.highlighted ? styles.resultOptionChosen : ''}`}>
            {option.highlighted && <span className={styles.resultFill} aria-hidden="true" />}
            <span title={option.label}>{option.label}</span>
            <span>{option.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
