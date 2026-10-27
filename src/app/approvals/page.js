import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SignInCard } from '@/components/compose/SignInCard';
import { ApprovalsList } from '@/components/approvals/ApprovalsList';
import { getCurrentUser, isDiscourseConfigured } from '@/lib/discourse';
import styles from '@/components/approvals/Approvals.module.css';

export const metadata = { title: 'Join requests | AV Community' };

// Admins and moderators approve or decline join requests here (the staff
// notice "1 user waiting for approval" links to this page).
export default async function ApprovalsPage() {
  const user = await getCurrentUser().catch(() => null);
  const trail = <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Join requests' }]} />;

  if (!user) {
    return (
      <main className="container min-h-screen">
        {trail}
        <SignInCard returnTo="/approvals" title="Sign in to review join requests" />
      </main>
    );
  }
  return (
    <main className="container min-h-screen">
      {trail}
      {!isDiscourseConfigured() ? (
        <section className={styles.card}><p className={styles.status}>Join requests appear here once the forum is connected.</p></section>
      ) : user.staff ? (
        <ApprovalsList />
      ) : (
        <section className={styles.card}>
          <h1 className={styles.title}>Join requests</h1>
          <p className={styles.status}>Only admins and moderators can review join requests.</p>
        </section>
      )}
    </main>
  );
}
