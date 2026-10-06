import React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ArticleContent } from '@/components/insights/ArticleContent';
import { RelatedArticles } from '@/components/insights/RelatedArticleGridCard';
import { CommentForm } from '@/components/insights/CommentForm';
import styles from '@/components/insights/ArticleDetail.module.css';
import topicStyles from '@/components/topic/Topic.module.css';
import { notFound } from 'next/navigation';
import { getTopic, isDiscourseConfigured } from '@/lib/discourse';
import { DiscourseError } from '@/lib/discourse/client';
import { timeAgo } from '@/lib/discourse/format';
import { loadRelatedArticles } from '@/lib/discourse/lists';

const DIVIDER = { border: 0, borderTop: '1px solid #e5e7eb' };

// Sample article, shown when Discourse is not connected.
const articleData = {
  id: '1',
  title: 'The engagement letter decides',
  titleHighlight: 'what the family keeps',
  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop',
  author: 'Priya Mehta',
  timeAgo: '2h ago',
  category: 'Family Office Trends',
  content: {
    section1Title: 'Under the AICPA Code, working papers stay with the firm unless a contract says otherwise. Most letters say nothing.',
    paragraph1: 'Engagements move for ancillary reasons. A partner retires. A fee resets past what the family will carry. A firm is acquired. What is unusual is how much of the outcome was already fixed, years earlier, by a document nobody reread. The governing rule is the Records Requests interpretation of the AICPA Code, revised by the Professional Ethics Executive Committee in February 2021 and effective 31 July 2021. It sorts everything a firm holds into four categories, and the family\'s position differs in each.',
    source1: '(Source: AICPA & CIMA/The Tax Adviser)',
    section2Title: 'Where the line falls',
    splitTextLeft: 'Client-provided records, member-prepared records and final work product must be provided. Working papers need not be. Working papers are the firm\'s property, and the exception is narrow: a requirement imposed by state or federal authority, or by contractual agreement.\n\nThat last clause is the whole article. The rule anticipates that the engagement letter will override the default. It simply does not require one.',
    splitTextRight: 'In practice, the hardest call is whether something is a member-prepared record or a working paper, a line that software has made harder to draw. The illustration matters for families: if the firm holds the only electronic copy of information the family needs for complete records, that is a member-prepared record and must be provided. If the firm agreed in the engagement letter to hand over the files, it becomes work product. Same data, different obligation, decided by a sentence.',
    source2: '(Source: Mordaq/The Tax Adviser)',
    source3: '(Source: The Tax Adviser/Issue)',
    section3Title: 'What the rule already gives you',
    section3Left: 'Client-provided records cannot be withheld over unpaid fees on a first request, though the firm may charge for retrieval, copying and shipping. A response owed beyond 45 days is treated as a discreditable act.',
    section3Left2: 'Acquisitions have their own provision. On the sale or transfer of a practice, the selling firm should write to each affected client seeking consent before files move to the successor. Consolidation makes that letter a routine arrival rather than a rare one.',
    section3Right: 'The default is workable, and the override is available. Families that lose two quarters in a handover are rarely victims of a firm\'s position. They are reading a letter that never contemplated the day it would be needed.',
  }
};

const relatedArticles = [
  {
    id: 'r1',
    title: 'The 45-day clock',
    description: 'What a firm owes a departing client, in what order, and what it can charge for. The AICPA framework in plain language, including the fees question most letters get wrong.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'r2',
    title: 'Member-prepared record or working paper',
    description: 'The distinction decides what a family receives, and software has made it harder to draw. Four scenarios where practitioners get it wrong in opposite directions.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'r3',
    title: 'The cost of a bad handover',
    description: 'Quarters lost, history rebuilt, work paid for twice. Priced from operator accounts rather than estimated.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'r4',
    title: 'The credential problem',
    description: 'Portal access issued to a person rather than a role. What happens at resignation, and the four systems where it is most likely to bite.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop'
  }
];

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
  return { title: `${live ? live.topic.title : articleData.title} | AV Community` };
}

export default async function InsightDetailPage({ params }) {
  const { id } = await params;
  const live = await loadArticle(id);
  if (live) return <LiveArticle topic={live.topic} related={live.related} />;

  return (
    <div className="container min-h-screen" style={{ paddingBottom: 'calc(2.5 * var(--sa))' }}>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Articles', href: '/insights' },
        { label: 'The engagement letter decides what the family keeps' }
      ]} className={styles.breadcrumb} />

      <div className={`bg-white ${styles.card}`} style={{ borderRadius: 'calc(1.1 * var(--sa))', padding: 'calc(3 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(1 * var(--sa)) rgba(0,0,0,0.02)' }}>

        {/* Article Header - left aligned */}
        <div className={styles.header} style={{ marginBottom: 'calc(2 * var(--sa))' }}>
          <h1 className={`font-semibold text-gray-900 ${styles.title}`} style={{ fontSize: 'calc(3.2 * var(--fa) + var(--fb))', lineHeight: 1.2, marginBottom: 'calc(0.3 * var(--sa))' }}>
            {articleData.title}
          </h1>
          <h1 className={`font-semibold text-[#00A4E4] ${styles.title}`} style={{ fontSize: 'calc(3.2 * var(--fa) + var(--fb))', lineHeight: 1.2 }}>
            {articleData.titleHighlight}
          </h1>
        </div>

        {/* Article Hero Image */}
        <div className={`overflow-hidden ${styles.hero}`} style={{ borderRadius: 'calc(0.8 * var(--sa))', marginBottom: 'calc(1.2 * var(--sa))', maxHeight: 'calc(30 * var(--da) + var(--db))' }}>
          <img src={articleData.image} alt={articleData.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Meta */}
        <div className={`flex text-[#00A4E4] border-b border-gray-100 ${styles.meta}`} style={{ gap: 'calc(1 * var(--sa))', fontSize: 'calc(1 * var(--fa) + var(--fb))', marginBottom: 'calc(1.5 * var(--sa))', paddingBottom: 'calc(1.2 * var(--sa))' }}>
          <span>{articleData.author}</span>
          <span className={`text-gray-300 ${styles.sep}`}>|</span>
          <span>{articleData.timeAgo}</span>
          <span className={`text-gray-300 ${styles.sep}`}>|</span>
          <span>{articleData.category}</span>
        </div>

        {/* Article Body */}
        <div className={styles.content}>
          <ArticleContent content={articleData.content} />
        </div>

        {/* The article body ends with its own divider. */}
        <CommentForm />
        <hr style={DIVIDER} />
        <RelatedArticles articles={relatedArticles} />

      </div>
    </div>
  );
}

// The forum article: its title, author line and the post's own HTML, then the
// comment box (posts a reply) and the other articles.
function LiveArticle({ topic, related }) {
  const post = topic.firstPost;
  return (
    <div className="container min-h-screen" style={{ paddingBottom: 'calc(2.5 * var(--sa))' }}>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Articles', href: '/insights' },
        { label: topic.title }
      ]} className={styles.breadcrumb} />

      <div className={`bg-white ${styles.card}`} style={{ borderRadius: 'calc(1.1 * var(--sa))', padding: 'calc(3 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(1 * var(--sa)) rgba(0,0,0,0.02)' }}>
        <div className={styles.header} style={{ marginBottom: 'calc(2 * var(--sa))' }}>
          <h1 className={`font-semibold text-gray-900 ${styles.title}`} style={{ fontSize: 'calc(3.2 * var(--fa) + var(--fb))', lineHeight: 1.2 }}>
            {topic.title}
          </h1>
        </div>

        <div className={`flex text-[#00A4E4] border-b border-gray-100 ${styles.meta}`} style={{ gap: 'calc(1 * var(--sa))', fontSize: 'calc(1 * var(--fa) + var(--fb))', marginBottom: 'calc(1.5 * var(--sa))', paddingBottom: 'calc(1 * var(--sa))' }}>
          <span>{post?.author.name}</span>
          <span className={`text-gray-300 ${styles.sep}`}>|</span>
          <span>{timeAgo(post?.createdAt)}</span>
          {topic.categoryName && (
            <>
              <span className={`text-gray-300 ${styles.sep}`}>|</span>
              <span>{topic.categoryName}</span>
            </>
          )}
        </div>

        <div className={`${styles.content} ${topicStyles.cooked}`} dangerouslySetInnerHTML={{ __html: post?.html || '' }} />

        <CommentForm topicId={topic.id} />
        <hr style={DIVIDER} />
        {related.length > 0 && <RelatedArticles articles={related} />}
      </div>
    </div>
  );
}
