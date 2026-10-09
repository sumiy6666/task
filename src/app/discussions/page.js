import React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PollWidget } from '@/components/ui/PollWidget';
import { DiscussionComposer } from '@/components/discussions/DiscussionComposer';
import { FeedCard } from '@/components/discussions/FeedCard';
import { CategoryList } from '@/components/discussions/CategoryList';
import styles from '@/components/discussions/Feed.module.css';
import { getCurrentUser } from '@/lib/discourse';
import { loadDiscussions } from '@/lib/discourse/lists';

export const metadata = { title: 'Discussions | AV Community' };

const SAMPLE_TAGS = ['FamilyOffice', 'Investments', 'BestPractices', 'Liquidity'];

// Sample feed, shown when Discourse is not connected. Sample ids are not
// numbers, so they never link to a real forum topic.
const sampleFeed = [
  {
    id: 'sample-201',
    title: 'Best practices for managing liquid investments in family portfolios?',
    author: { name: 'Ramesh Mehta', avatar: 'https://i.pravatar.cc/160?img=12' },
    timeAgo: '2h ago',
    category: 'Investments',
    tags: SAMPLE_TAGS,
    body: [
      'I’m curious to learn, from this community, what approaches are family offices using to balance liquidity, return expectations and portfolio flexibility? Are there any frameworks, tools or strategies that have worked well for you, especially in volatile markets?',
      'Would love to hear your experience, lessons learnt, or resources you’d recommend!',
    ],
    replies: 24,
    likes: 15,
    views: 1200,
    lastActivity: '1h ago',
    reply: {
      author: { name: 'Rohan Kapoor', avatar: 'https://i.pravatar.cc/160?img=11' },
      text: 'I’m curious to learn, from this community, what approaches are family offices using to balance liquidity, return expectations and portfolio flexibility? Are there any frameworks, tools or strategies that have worked well for you, especially in volatile markets?',
      likes: 8,
      replies: 1,
    },
  },
  {
    id: 'sample-202',
    title: 'Which asset class has performed best for your office over the last 3 years?',
    author: { name: 'Praveen Puri', avatar: 'https://i.pravatar.cc/160?img=59' },
    timeAgo: '3h ago',
    category: 'Investments',
    tags: SAMPLE_TAGS,
    pollOptions: ['Private equity', 'Venture', 'Real estate', 'Public equities', 'Hedge funds', 'Fixed income'],
  },
  {
    id: 'sample-203',
    title: 'Year-end accounting checklist for family office',
    author: { name: 'Varun Vashi', avatar: 'https://i.pravatar.cc/160?img=68' },
    timeAgo: '4h ago',
    category: 'Family Office',
    tags: SAMPLE_TAGS,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    body: [
      'Simplify your family office’s year end close with a practical checklist covering account reconciliations, investment records and financial reporting. Keep essential tasks on track and begin the new financial year with clear, organised records.',
      'What do you think?',
    ],
    replies: 24,
    likes: 15,
    views: 1200,
    lastActivity: '1h ago',
  },
];

// The first row shows every category.
const sampleCategories = [
  { name: 'General', count: '1.2K', isAll: true },
  { name: 'Industry Trends', count: '236' },
  { name: 'Best Practices', count: '186' },
  { name: 'Product/AV', count: '142' },
  { name: 'Family Office', count: '201' },
  { name: 'Investments', count: '248' },
  { name: 'Accounting', count: '98' },
  { name: 'Technology', count: '154' },
];

const samplePoll = {
  question: 'What would you like to see discussed next?',
  options: [
    { label: 'Industry trends and insights', percentage: 46 },
    { label: 'Best practices and case studies', percentage: 28 },
    { label: 'Tools and technologies', percentage: 16 },
    { label: 'Networking events', percentage: 10 },
  ],
  responsesText: '120 responses • 2h ago',
};

// A forum topic or poll, in the shape FeedCard takes.
const fromTopic = (t) => ({ ...t, body: t.description ? [t.description] : [] });
const fromPoll = (p) => ({
  id: p.topicId,
  title: p.question,
  author: { name: 'Poll', avatar: '/images/pollicon.png' },
  timeAgo: p.time,
  category: p.category,
  pollOptions: p.options.map((o) => o.label),
});
const sidebarPoll = (p) => ({
  question: p.question,
  options: p.options.map((o) => ({ label: o.label, percentage: parseInt(o.percentage, 10) || 0 })),
  responsesText: `${p.voters} ${p.voters === 1 ? 'response' : 'responses'} • ${p.time}`,
});

export default async function DiscussionPage({ searchParams }) {
  const { category } = await searchParams;
  const [live, user] = await Promise.all([loadDiscussions(), getCurrentUser().catch(() => null)]);

  const categories = live?.categories.length > 1
    ? live.categories.map((c, i) => ({ name: c.name, count: c.count, isAll: i === 0 }))
    : sampleCategories;
  const active = categories.some((c) => c.name === category && !c.isAll) ? category : null;

  let feed = live?.feed.length ? live.feed.map(fromTopic) : sampleFeed;
  if (live?.feedPoll) feed.splice(1, 0, fromPoll(live.feedPoll));
  if (active) feed = feed.filter((item) => item.category === active);
  feed = feed.slice(0, 8);

  const poll = live?.poll ? sidebarPoll(live.poll) : samplePoll;

  return (
    <main className={`container ${styles.page}`}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Discussion' }]} />

      <div className={styles.layout}>
        <DiscussionComposer avatar={user?.avatar} categories={categories.filter((c) => c.name !== 'All categories')} />

        <CategoryList categories={categories} active={active} />

        <section className={styles.feed} aria-label="Discussions">
          {feed.length > 0 ? (
            feed.map((item) => <FeedCard key={item.id} item={item} currentUser={user} />)
          ) : (
            <div className={`${styles.card} ${styles.empty}`}>No discussions in {active} yet.</div>
          )}
        </section>

        <PollWidget title={null} className={styles.sidePoll} {...poll} />
      </div>
    </main>
  );
}
