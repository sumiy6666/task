import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ComposeFlow } from '@/components/compose/ComposeFlow';
import { getCategories, getCurrentUser } from '@/lib/discourse';

export const metadata = { title: 'Start a Conversation | AV Community' };

export default async function NewConversationPage({ searchParams }) {
  const { type } = await searchParams;
  const [user, categories] = await Promise.all([getCurrentUser(), getCategories()]);

  return (
    <main className="container min-h-screen">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Start a Conversation' }]} />
      <ComposeFlow user={user} categories={categories} initialType={type === 'poll' ? 'poll' : 'discussion'} />
    </main>
  );
}
