import styles from './Compose.module.css';

// Shown on "Start a Conversation" to guests: posting needs a forum account.
export function SignInCard({ returnTo }) {
  return (
    <section className={styles.card}>
      <div className={styles.success}>
        <h1 className={styles.successTitle}>Sign in to start a conversation</h1>
        <p className={styles.successText}>Use your AV Community account. You will come straight back here afterwards.</p>
        <div className={styles.successActions}>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href={`/api/auth/login?return=${encodeURIComponent(returnTo)}`}>
            Sign in with AV Community
          </a>
        </div>
      </div>
    </section>
  );
}
