import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ComposeFlow } from '@/components/compose/ComposeFlow';
import styles from '@/components/compose/Compose.module.css';
import { SignInCard } from '@/components/compose/SignInCard';
import { getCategories, getCurrentUser } from '@/lib/discourse';

export const metadata = { title: 'Start a Discussion | AV Community' };

export default async function NewConversationPage({ searchParams }) {
  const { type, title, category, body, images } = await searchParams;
  // Images added in the discussions page's composer: [{ name, url, markdown }].
  let initialImages = [];
  try {
    initialImages = (JSON.parse(images || '[]') || []).filter((i) => i && typeof i.markdown === 'string' && /^https:\/\//.test(i.url)).slice(0, 10);
  } catch {}
  const user = await getCurrentUser();
  const returnTo = type === 'poll' ? '/conversations/new?type=poll' : '/conversations/new';
  const categories = user ? await getCategories() : [];

  return (
    <main className={`container min-h-screen ${styles.page}`}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Start a Discussion' }]} />
      {user ? (
        <ComposeFlow user={user} categories={categories} initialType={type === 'poll' ? 'poll' : 'discussion'} initialTitle={title || ''} initialCategory={category} initialBody={body || ''} initialImages={initialImages} />
      ) : (
        <SignInCard returnTo={returnTo} />
      )}
    </main>
  );
}
