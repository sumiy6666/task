import { redirect } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { getCurrentUser, isSignInEnabled } from '@/lib/discourse';

export const metadata = { title: 'Request to Join | AV Community' };

// New members ask to join here; signed-in members have nothing to do.
export default async function SignUpPage() {
  if (isSignInEnabled() && (await getCurrentUser().catch(() => null))) redirect('/');
  return (
    <main className="container min-h-screen">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Request to Join' }]} />
      <SignUpForm />
    </main>
  );
}
