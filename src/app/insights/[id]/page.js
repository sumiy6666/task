import React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ArticleContent } from '@/components/insights/ArticleContent';
import { RelatedArticleGridCard } from '@/components/insights/RelatedArticleGridCard';
import { PollWidget } from '@/components/ui/PollWidget';
import { JoinDiscussionForm } from '@/components/insights/JoinDiscussionForm';

// Mock Data for Detail Page
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

const articlePoll = {
  question: 'When a family adds a new asset class, how long before it appears in consolidated reporting?',
  options: [
    { label: 'Same month', percentage: 46, color: '#3eb0ff' },
    { label: 'Within a quarter', percentage: 28, color: '#0056b3' },
    { label: 'Two quarters or more', percentage: 16, color: '#00a4e4' },
    { label: 'It never fully does', percentage: 10, color: '#0078d4' }
  ]
};

export default function InsightDetailPage() {
  return (
    <div className="container min-h-screen" style={{ paddingBottom: '2.5vw' }}>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Articles', href: '/insights' },
        { label: 'The engagement letter decides what the family keeps' }
      ]} />

      <div className="bg-white" style={{ borderRadius: '1.1vw', padding: '3vw', boxShadow: '0 0.2vw 1vw rgba(0,0,0,0.02)' }}>

        {/* Article Header - left aligned */}
        <div style={{ marginBottom: '2vw' }}>
          <h1 className="font-semibold text-gray-900" style={{ fontSize: '3.2vw', lineHeight: 1.2, marginBottom: '0.3vw' }}>
            {articleData.title}
          </h1>
          <h1 className="font-semibold text-[#00A4E4]" style={{ fontSize: '3.2vw', lineHeight: 1.2 }}>
            {articleData.titleHighlight}
          </h1>
        </div>

        {/* Article Hero Image */}
        <div className="overflow-hidden" style={{ borderRadius: '0.8vw', marginBottom: '1.2vw', maxHeight: '30vw' }}>
          <img src={articleData.image} alt={articleData.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Meta */}
        <div className="flex text-[#00A4E4] border-b border-gray-100" style={{ gap: '1vw', fontSize: '1vw', marginBottom: '1.5vw', paddingBottom: '1.2vw' }}>
          <span>{articleData.author}</span>
          <span className="text-gray-300">|</span>
          <span>{articleData.timeAgo}</span>
          <span className="text-gray-300">|</span>
          <span>{articleData.category}</span>
        </div>

        {/* Article Body */}
        <ArticleContent content={articleData.content} />

        {/* Related Articles Section */}
        <div style={{ marginBottom: '2.5vw' }}>
          <h3 className="font-semibold text-gray-800" style={{ fontSize: '1.5vw', marginBottom: '1.2vw' }}>Related Articles</h3>
          <div className="grid grid-cols-4" style={{ gap: '1.5vw' }}>
            {relatedArticles.map(article => (
              <RelatedArticleGridCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-0" style={{ borderTop: '0.05vw solid #eaeaea', margin: '2vw 0' }} />

        {/* Footer Area: Poll & Discussion */}
        <div className="grid grid-cols-2" style={{ gap: '2vw' }}>
          <div>
            <PollWidget
              question={articlePoll.question}
              options={articlePoll.options}
              title="RELATED POLL"
            />
          </div>
          <div>
            <JoinDiscussionForm />
          </div>
        </div>

      </div>
    </div>
  );
}
