import React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PollWidget } from '@/components/ui/PollWidget';
import { SubscribeWidget } from '@/components/ui/SubscribeWidget';
import { FeaturedInsight } from '@/components/insights/FeaturedInsight';
import { InsightListCard } from '@/components/insights/InsightListCard';
import { DiscussionItem } from '@/components/insights/DiscussionItem';
import { RecommendedArticleItem } from '@/components/insights/RecommendedArticleItem';
import { ExpertPerspectiveCard } from '@/components/insights/ExpertPerspectiveCard';

// Mock Data
const featuredArticle = {
  id: 'featured-1',
  title: 'Family offices and impact: Investing with purpose',
  description: 'How family offices are aligning capital with values to drive meaningful change.',
  image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop',
  readTime: '10 min',
  author: {
    name: 'Poonam Shah',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  timeAgo: '2h ago',
  category: 'Investment Insights'
};

const latestInsights = [
  {
    id: '1',
    title: 'The Future of family governance: Principles for sustainable legacy',
    description: 'Exploring governance frameworks that help families stay aligned across generations.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400&auto=format&fit=crop',
    author: 'Priya Mehta',
    timeAgo: '2h ago',
    category: 'Family Office Trends',
    readTime: '5 min'
  },
  {
    id: '2',
    title: 'AI in investment research: From analysis to action',
    description: 'How AI tools are transforming research workflows and enabling faster, smarter decisions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop',
    author: 'Arvind Rajan',
    timeAgo: '1d ago',
    category: 'Technology & AI',
    readTime: '8 min'
  },
  {
    id: '3',
    title: 'Year-end accounting checklist for family office',
    description: 'A practical checklist to close the year with accuracy and confidence.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=400&auto=format&fit=crop',
    author: 'Neha Shah',
    timeAgo: '2h ago',
    category: 'Accounting and reporting',
    readTime: '4 min'
  },
  {
    id: '4',
    title: 'Global tax updates families need to know in 2024',
    description: 'Key changes in tax regulations and what they mean for multi-jurisdiction family offices.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop',
    author: 'Rohan Kapoor',
    timeAgo: '3d ago',
    category: 'Family Office Trends',
    readTime: '6 min'
  }
];

const expertPerspectives = [
  {
    id: 'e1',
    name: 'Vaayu Rajan',
    contributions: 90,
    avatar: 'https://i.pravatar.cc/100?img=11',
    title: 'Navigating market volatility with a long-term lens',
    color: '#0056b3'
  },
  {
    id: 'e2',
    name: 'Poonam Shah',
    contributions: 112,
    avatar: 'https://i.pravatar.cc/100?img=5',
    title: 'Building resilient families through values and vision',
    color: '#6600cc'
  },
  {
    id: 'e3',
    name: 'Amit Ameta',
    contributions: 87,
    avatar: 'https://i.pravatar.cc/100?img=8',
    title: 'The next wave of alternative investments',
    color: '#9900cc'
  }
];

const relatedDiscussions = [
  { id: 'd1', title: 'How do you evaluate impact investments?', replies: 24, timeAgo: '2d ago' },
  { id: 'd2', title: 'Balancing risk and purpose in family portfolios', replies: 18, timeAgo: '3d ago' },
  { id: 'd3', title: 'Measuring impact beyond financial returns', replies: 16, timeAgo: '4d ago' },
  { id: 'd4', title: 'Governance best practices for impact investing', replies: 12, timeAgo: '5d ago' }
];

const relatedPolls = {
  question: 'What would you like to see discussed next?',
  options: [
    { label: 'Industry trends and insights', percentage: 46, color: '#00a4e4' },
    { label: 'Best practices and case studies', percentage: 28, color: '#316b9b' },
    { label: 'Tools and technologies', percentage: 16, color: '#00bfff' },
    { label: 'Networking events', percentage: 10, color: '#446688' }
  ],
  responsesText: '120 responses • 2h ago'
};

const recommendedArticles = [
  { id: 'r1', title: 'Impact investing: Beyond Trends', readTime: '5 min read' },
  { id: 'r2', title: 'Building a purpose driven investment strategy', readTime: '7 min read' },
  { id: 'r3', title: 'ESG integration in private markets', readTime: '6 min read' },
  { id: 'r4', title: 'Impact investing: Beyond Trends', readTime: '5 min read' }
];

export default function InsightsListingPage() {
  return (
    <div className="container min-h-screen" style={{ paddingBottom: '2.5vw' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Insights' }]} />

      <FeaturedInsight article={featuredArticle} />

      <div className="flex flex-wrap" style={{ gap: '1.5vw' }}>
        {/* Main Content Column */}
        <div className="flex-[1_1_65%]" style={{ minWidth: '40vw' }}>
          <div className="bg-white" style={{ borderRadius: '1.1vw', padding: '1.8vw', marginBottom: '1.2vw', boxShadow: '0 0.2vw 0.8vw rgba(0,0,0,0.06)' }}>
            <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: '1vw', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: '1vw' }}>
              LATEST INSIGHTS
            </h3>

            <div className="flex flex-col">
              {latestInsights.map(article => (
                <InsightListCard key={article.id} article={article} />
              ))}
            </div>

            <div style={{ marginTop: '1.2vw' }}>
              <a href="#" className="text-gray-400 no-underline flex items-center hover:text-[#00A4E4] transition-colors" style={{ fontSize: '0.7vw', gap: '0.4vw' }}>
                VIEW MORE
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1vw', height: '1vw' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="bg-white" style={{ borderRadius: '1.1vw', padding: '2vw', boxShadow: '0 0.2vw 0.8vw rgba(0,0,0,0.06)' }}>
            <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: '1vw', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: '1.5vw' }}>
              EXPERT PERSPECTIVES
            </h3>
            <div className="grid grid-cols-3" style={{ gap: '1.2vw' }}>
              {expertPerspectives.map(expert => (
                <ExpertPerspectiveCard key={expert.id} expert={expert} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="flex-[1_1_30%] flex flex-col" style={{ minWidth: '20vw', gap: '1vw' }}>
          <div className="bg-white" style={{ borderRadius: '0.8vw', padding: '1.5vw', boxShadow: '0 0.3vw 1vw rgba(0,0,0,0.05)' }}>
            <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: '1vw', lineHeight: '1.2', letterSpacing: '0em', color: '#000', marginBottom: '1vw' }}>
              RELATED<br />DISCUSSIONS
            </h3>
            <div>
              {relatedDiscussions.map(discussion => (
                <DiscussionItem key={discussion.id} discussion={discussion} />
              ))}
            </div>
          </div>

          <PollWidget
            question={relatedPolls.question}
            options={relatedPolls.options}
            responsesText={relatedPolls.responsesText}
          />

          <div className="bg-white" style={{ borderRadius: '0.8vw', padding: '1.5vw', boxShadow: '0 0.3vw 1vw rgba(0,0,0,0.05)' }}>
            <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: '1vw', lineHeight: '1.2', letterSpacing: '0em', color: '#000', marginBottom: '1vw' }}>
              RECOMMENDED<br />ARTICLES
            </h3>
            <div>
              {recommendedArticles.map(article => (
                <RecommendedArticleItem key={article.id} article={article} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
