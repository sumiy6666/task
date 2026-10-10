import styles from './Compose.module.css';

// Shown to guests where a forum account is needed (posting, My Profile).
export function SignInCard({ returnTo, title = 'Sign in to start a conversation' }) {
  return (
    <section className={styles.card}>
      <div className={styles.success}>
        <h1 className={styles.successTitle}>{title}</h1>
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
