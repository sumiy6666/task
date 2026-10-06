import React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PollWidget } from '@/components/ui/PollWidget';
import { SubscribeWidget } from '@/components/ui/SubscribeWidget';
import { FeaturedInsight } from '@/components/insights/FeaturedInsight';
import { InsightListCard } from '@/components/insights/InsightListCard';
import { DiscussionItem } from '@/components/insights/DiscussionItem';
import { RecommendedArticleItem } from '@/components/insights/RecommendedArticleItem';
import { ExpertPerspectives } from '@/components/insights/ExpertPerspectiveCard';
import { Reveal } from '@/components/ui/Reveal';

const CARD = {
  borderRadius: 'calc(1.6 * var(--sa))',
  boxShadow: '0 calc(0.3 * var(--sa)) calc(1.5 * var(--sa)) rgba(0, 62, 207, 0.06)'
};

const SIDEBAR_PADDING = 'calc(2.6 * var(--sa)) calc(2 * var(--sa)) calc(1.5 * var(--sa))';

const CARD_TITLE = {
  fontWeight: 400,
  fontSize: 'calc(1 * var(--fa) + var(--fb))',
  lineHeight: 1.2,
  color: '#000',
  whiteSpace: 'nowrap'
};

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
    color: '#003ECF'
  },
  {
    id: 'e2',
    name: 'Poonam Shah',
    contributions: 112,
    avatar: 'https://i.pravatar.cc/100?img=5',
    title: 'Building resilient families through values and vision',
    color: '#5600CF'
  },
  {
    id: 'e3',
    name: 'Amit Ameta',
    contributions: 87,
    avatar: 'https://i.pravatar.cc/100?img=8',
    title: 'The next wave of alternative investments',
    color: '#9400CF'
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
    { label: 'Industry trends and insights', percentage: 46 },
    { label: 'Best practices and case studies', percentage: 28 },
    { label: 'Tools and technologies', percentage: 16 },
    { label: 'Networking events', percentage: 10 }
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
    <div className="container min-h-screen" style={{ paddingBottom: 'calc(2.5 * var(--sa))' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Insights' }]} />

      <FeaturedInsight article={featuredArticle} />

      <div className="flex flex-wrap" style={{ gap: 'calc(1.5 * var(--sa))' }}>
        {/* Main Content Column */}
        <div className="flex-[1_1_65%]" style={{ minWidth: 'min(100%, calc(40 * var(--da) + var(--db)))' }}>
          <div className="bg-white" style={{ ...CARD, padding: 'calc(4 * var(--sa)) calc(2.7 * var(--sa)) calc(2 * var(--sa))', marginBottom: 'calc(1.5 * var(--sa))' }}>
            <Reveal as="h3" className="uppercase" style={{ ...CARD_TITLE, marginBottom: 'calc(2.5 * var(--sa))' }}>
              LATEST INSIGHTS
            </Reveal>

            <Reveal stagger={120} delay={150} className="flex flex-col">
              {latestInsights.map((article) => (
                <InsightListCard key={article.id} article={article} />
              ))}
            </Reveal>

            <div style={{ marginTop: 'calc(1.2 * var(--sa))' }}>
              <a href="#" className="text-gray-400 no-underline flex items-center hover:text-[#00A4E4] transition-colors" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))', gap: 'calc(0.4 * var(--sa))' }}>
                VIEW MORE
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(1 * var(--da) + var(--db))', height: 'calc(1 * var(--da) + var(--db))' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <ExpertPerspectives experts={expertPerspectives} />
        </div>

        {/* Sidebar Column */}
        <div className="flex-[1_1_30%] flex flex-col" style={{ minWidth: 'min(100%, calc(20 * var(--da) + var(--db)))', gap: 'calc(1 * var(--sa))' }}>
          <div className="bg-white" style={{ ...CARD, padding: SIDEBAR_PADDING }}>
            <Reveal as="h3" delay={200} className="uppercase" style={{ ...CARD_TITLE, marginBottom: 'calc(0.5 * var(--sa))' }}>
              RELATED DISCUSSIONS
            </Reveal>
            <Reveal stagger={120} delay={350}>
              {relatedDiscussions.map((discussion, i) => (
                <DiscussionItem key={discussion.id} discussion={discussion} index={i} />
              ))}
            </Reveal>
          </div>

          <Reveal delay={200}>
            <PollWidget
              question={relatedPolls.question}
              options={relatedPolls.options}
              responsesText={relatedPolls.responsesText}
            />
          </Reveal>

          <div className="bg-white" style={{ ...CARD, padding: SIDEBAR_PADDING }}>
            <Reveal as="h3" delay={200} className="uppercase" style={{ ...CARD_TITLE, marginBottom: 'calc(0.5 * var(--sa))' }}>
              RECOMMENDED ARTICLES
            </Reveal>
            <Reveal stagger={120} delay={350}>
              {recommendedArticles.map((article, i) => (
                <RecommendedArticleItem key={article.id} article={article} index={i} />
              ))}
            </Reveal>
          </div>

        </div>
      </div>
    </div>
  );
}
