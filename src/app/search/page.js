import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { searchForum } from '@/lib/discourse/lists';
import styles from './Search.module.css';

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  return { title: q ? `“${q}” | Search | AV Community` : 'Search | AV Community' };
}

// Results for the header's search box: discussions, articles and polls.
export default async function SearchPage({ searchParams }) {
  const { q = '' } = await searchParams;
  const term = String(q).trim();
  const found = term ? await searchForum(term) : null;
  const results = found?.results || [];

  return (
    <main className="container min-h-screen">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      <section className={styles.card}>
        <form action="/search" className={styles.form} role="search">
          <input name="q" type="search" defaultValue={term} placeholder="Search discussions, articles and polls" aria-label="Search the community" className={styles.input} />
          <button type="submit" className={styles.button}>SEARCH</button>
        </form>

        {!term && <p className={styles.status}>Type at least two letters to search.</p>}
        {term && found === null && <p className={styles.status}>Search isn’t available right now. Please try again in a moment.</p>}
        {term && found && (
          <p className={styles.status}>
            {results.length === 0 ? <>No results for <strong>“{term}”</strong>.</> : <>{results.length} {results.length === 1 ? 'result' : 'results'} for <strong>“{term}”</strong></>}
          </p>
        )}

        <ul className={styles.list}>
          {results.map((r) => (
            <li key={r.id} className={styles.item}>
              <Link prefetch={false} href={r.href} className={styles.title}>{r.title}</Link>
              <div className={styles.meta}>
                {r.category && <span className={styles.category}>{r.category}</span>}
                {r.author && <span>{r.author.name}</span>}
                <span>{r.timeAgo}</span>
                <span>{r.replies} {r.replies === 1 ? 'reply' : 'replies'}</span>
              </div>
              {r.excerpt && <p className={styles.excerpt}>{r.excerpt}</p>}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
