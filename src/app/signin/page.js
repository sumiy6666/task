import { redirect } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SignInCard } from '@/components/compose/SignInCard';
import { getCurrentUser } from '@/lib/discourse';
import { safeReturnPath } from '@/lib/discourse/session';

export const metadata = { title: 'Sign in | AV Community' };

// Where visitors who aren't signed in land (see src/proxy.js). Signing in
// brings them back to the page they asked for.
export default async function SignInPage({ searchParams }) {
  const returnTo = safeReturnPath((await searchParams).return);
  if (await getCurrentUser().catch(() => null)) redirect(returnTo);
  return (
    <main className="container min-h-screen">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Sign in' }]} />
      <SignInCard returnTo={returnTo} title="Sign in to AV Community" />
    </main>
  );
}
