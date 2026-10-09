import React from 'react';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ArticleContent } from '@/components/insights/ArticleContent';
import { ArticleComments } from '@/components/insights/ArticleComments';
import { RelatedArticles } from '@/components/insights/RelatedArticleGridCard';
import { BookmarkButton } from '@/components/discussions/BookmarkButton';
import { LikeIcon } from '@/components/discussions/icons';
import { LikeButton } from '@/components/topic/LikeButton';
import styles from '@/components/insights/Article.module.css';
import { getCurrentUser, getTopic, isDiscourseConfigured } from '@/lib/discourse';
import { DiscourseError } from '@/lib/discourse/client';
import { loadRelatedArticles } from '@/lib/discourse/lists';

// Sample article, shown when Discourse is not connected.
const articleData = {
  id: 'sample-article',
  // Shown as "The engagement letter / decides what the family keeps", the
  // last part in blue.
  title: 'The engagement letter',
  titleLead: 'decides',
  titleHighlight: 'what the family keeps',
  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop',
  author: 'Priya Mehta',
  readTime: '5 min read',
  date: '9th, January 2027',
  sources: ['AICPA & CIMA/The Tax Adviser', 'Mondaq/The Tax Adviser', 'The Tax Adviser'],
  category: 'Family Office Trends',
  blocks: [
    { type: 'p', text: 'Engagements move for ordinary reasons. A partner retires. A fee resets past what the family will carry. A firm is acquired. What is unusual is how much of the outcome was already fixed, years earlier, by a document nobody reread. The governing rule is the Records Requests interpretation of the AICPA Code, revised by the Professional Ethics Executive Committee in February 2021 and effective 31 July 2021. It sorts everything a firm holds into four categories, and the family’s position differs in each.' },
    { type: 'p', text: 'Under the AICPA Code, working papers stay with the firm unless a contract says otherwise. Most letters say nothing.' },
    { type: 'h', text: 'Where the line falls' },
    { type: 'p', text: 'Client-provided records, member-prepared records and final work product must be provided. Working papers need not be. Working papers are the firm’s property, and the exception is narrow: a requirement imposed by state or federal authority, or by contractual agreement. That last clause is the whole article. The rule anticipates that the engagement letter will override the default. It simply does not require one.' },
    { type: 'p', text: 'In practice, the hardest call is whether something is a member-prepared record or a working paper, a line that software has made harder to draw. The illustration matters for families: if the firm holds the only electronic copy of information the family needs for complete records, that is a member-prepared record and must be provided. If the firm agreed in the engagement letter to hand over the files, it becomes work product. Same data, different obligation, decided by a sentence.' },
    { type: 'h', text: 'What the rule already gives you' },
    { type: 'p', text: 'Client-provided records cannot be withheld over unpaid fees on a first request, though the firm may charge for retrieval, copying and shipping. A response owed beyond 45 days is treated as a discreditable act.' },
    { type: 'p', text: 'Acquisitions have their own provision. On the sale or transfer of a practice, the selling firm should write to each affected client seeking consent before files move to the successor. Consolidation makes that letter a routine arrival rather than a rare one. The default is workable, and the override is available. Families that lose two quarters in a handover are rarely victims of a firm’s position. They are reading a letter that never contemplated the day it would be needed.' },
  ],
  comments: [
    {
      id: 'c1',
      author: { name: 'Rohan Kapoor', avatar: 'https://i.pravatar.cc/160?img=11' },
      text: 'I’m curious to learn, from this community, what approaches are family offices using to balance liquidity, return expectations and portfolio flexibility? Are there any frameworks, tools or strategies that have worked well for you, especially in volatile markets?',
      likes: 8,
      children: [
        {
          id: 'c2',
          author: { name: 'Priyam Mehrothra', avatar: 'https://i.pravatar.cc/160?img=60' },
          text: 'I’m curious to learn, from this community, what approaches are family offices using to balance liquidity, return expectations and portfolio flexibility? Are there any frameworks, tools or strategies that have worked well for you, especially in volatile markets?',
          likes: 1,
          children: [],
        },
      ],
    },
  ],
};

const relatedArticles = [
  {
    id: 'r1',
    title: 'The 45-day clock',
    description: 'What a firm owes a departing client, in what order, and what it can charge for. The AICPA framework in plain language, including the fees question most letters get wrong.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'r2',
    title: 'Member-prepared record or working paper',
    description: 'The distinction decides what a family receives, and software has made it harder to draw. Four scenarios where practitioners get it wrong in opposite directions.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'r3',
    title: 'The cost of a bad handover',
    description: 'Quarters lost, history rebuilt, work paid for twice. Priced from operator accounts rather than estimated.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'r4',
    title: 'The credential problem',
    description: 'Portal access issued to a person rather than a role. What happens at resignation, and the four systems where it is most likely to bite.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop'
  }
];

// "9th, January 2027", as in the design.
function longDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const day = d.getDate();
  const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
  return `${day}${suffix}, ${d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
}

const readTime = (html = '') => `${Math.max(1, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200))} min read`;

// A forum article (a topic in the Articles category), or null to show the sample.
async function loadArticle(id) {
  if (!/^\d+$/.test(id) || !isDiscourseConfigured()) return null;
  try {
    const [topic, related] = await Promise.all([getTopic(id), loadRelatedArticles(id)]);
    return { topic, related: related || [] };
  } catch (error) {
    if (error instanceof DiscourseError && (error.status === 404 || error.status === 403)) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const live = await loadArticle(id);
  return { title: `${live ? live.topic.title : `${articleData.title} ${articleData.titleLead} ${articleData.titleHighlight}`} | AV Community` };
}

export default async function InsightDetailPage({ params }) {
  const { id } = await params;
  const [live, user] = await Promise.all([loadArticle(id), getCurrentUser().catch(() => null)]);

  if (!live) {
    return (
      <ArticleView
        article={{ ...articleData, body: <ArticleContent blocks={articleData.blocks} /> }}
        related={relatedArticles}
        currentUser={user}
      />
    );
  }

  const { topic, related } = live;
  const post = topic.firstPost;
  const article = {
    id: topic.id,
    title: topic.title,
    image: null,
    author: post?.author.name,
    readTime: readTime(post?.html),
    date: longDate(post?.createdAt),
    sources: [],
    category: topic.categoryName,
    // Discourse sanitises "cooked" HTML server-side before returning it.
    body: <div dangerouslySetInnerHTML={{ __html: post?.html || '' }} />,
    post,
    likeCount: topic.likeCount,
    comments: topic.replies,
  };
  return <ArticleView article={article} related={related} currentUser={user} />;
}

function ArticleView({ article, related, currentUser }) {
  const fullTitle = [article.title, article.titleLead, article.titleHighlight].filter(Boolean).join(' ');

  return (
    <main className={`container ${styles.page}`}>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Articles', href: '/insights' },
        { label: fullTitle }
      ]} />

      <article className={styles.card}>
        <h1 className={`${styles.title} rise-in`}>
          {article.title}
          {article.titleHighlight && (
            <>
              <br className={styles.titleBreak} /> {article.titleLead} <span className={styles.highlight}>{article.titleHighlight}</span>
            </>
          )}
        </h1>

        {article.image && <img className={`${styles.hero} rise-in`} style={{ '--delay': '0.15s' }} src={article.image} alt="" />}

        <div className={styles.main}>
          <div className={styles.body}>{article.body}</div>

          <aside className={styles.meta} aria-label="About this article">
            <div className={styles.metaAuthor}>{article.author}</div>
            <div>{article.readTime}</div>
            {article.date && <div>{article.date}</div>}
            {article.sources.length > 0 && (
              <ul className={styles.sources}>
                <li>Sources:</li>
                {article.sources.map((source) => <li key={source}>{source}</li>)}
              </ul>
            )}
          </aside>
        </div>

        <div className={styles.actions}>
          {article.category && <span className={styles.tag}>{article.category}</span>}
          <BookmarkButton topicId={article.id} initiallyBookmarked={Boolean(article.post?.bookmarked)} />
          {article.post ? (
            <LikeButton postId={article.post.id} initialLiked={Boolean(article.post.liked)} initialCount={article.likeCount} />
          ) : (
            <span className={styles.like} aria-label="Likes"><LikeIcon /></span>
          )}
        </div>

        <ArticleComments topicId={article.id} comments={article.comments} currentUser={currentUser} />
      </article>

      {related.length > 0 && <RelatedArticles articles={related} />}
    </main>
  );
}
