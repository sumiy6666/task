import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ComposeFlow } from '@/components/compose/ComposeFlow';
import { SignInCard } from '@/components/compose/SignInCard';
import { getCategories, getCurrentUser } from '@/lib/discourse';

export const metadata = { title: 'Start a Conversation | AV Community' };

export default async function NewConversationPage({ searchParams }) {
  const { type } = await searchParams;
  const user = await getCurrentUser();
  const returnTo = type === 'poll' ? '/conversations/new?type=poll' : '/conversations/new';
  const categories = user ? await getCategories() : [];

  return (
    <main className="container min-h-screen">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Start a Conversation' }]} />
      {user ? (
        <ComposeFlow user={user} categories={categories} initialType={type === 'poll' ? 'poll' : 'discussion'} />
      ) : (
        <SignInCard returnTo={returnTo} />
      )}
    </main>
  );
}
