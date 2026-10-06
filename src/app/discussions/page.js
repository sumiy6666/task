import React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import { EventBanner } from '@/components/discussions/EventBanner';
import { ConversationList } from '@/components/discussions/ConversationList';
import { CategoryList } from '@/components/discussions/CategoryList';
import { ActiveDiscussionsList } from '@/components/discussions/ActiveDiscussionsList';
import { TrendingDiscussions } from '@/components/discussions/TrendingDiscussions';
import { ActiveMembersList } from '@/components/discussions/ActiveMembersList';
import { PopularTagsList } from '@/components/discussions/PopularTagsList';
import { loadDiscussions } from '@/lib/discourse/lists';

// Sample data, shown when Discourse is not connected. Sample ids are not
// numbers, so they never link to a real forum topic.
const latestConversations = [
  {
    id: 'sample-101',
    title: 'Best practices for managing liquid investments in family portfolios?',
    author: { name: 'Priya Mehta', avatar: 'https://i.pravatar.cc/100?img=5' },
    timeAgo: '2h ago',
    category: 'Investments',
    views: null,
    replies: 24,
    likes: 15
  },
  {
    id: 'sample-102',
    title: 'How do yo approach next-gen engagement in your family office?',
    author: { name: 'Rohan Kapoor', avatar: 'https://i.pravatar.cc/100?img=11' },
    timeAgo: '5h ago',
    category: 'Family Office',
    views: null,
    replies: 18,
    likes: 9
  },
  {
    id: 'sample-103',
    title: 'Views on direct indexing for concentrated portfolios',
    author: { name: 'Arvind Rajan', avatar: 'https://i.pravatar.cc/100?img=8' },
    timeAgo: '1d ago',
    category: 'Investments',
    views: null,
    replies: 21,
    likes: 7
  },
  {
    id: 'sample-104',
    title: 'Using AI for research and portfolio monitoring',
    author: { name: 'Neha Shah', avatar: 'https://i.pravatar.cc/100?img=9' },
    timeAgo: '2d ago',
    category: 'Technology',
    views: null,
    replies: 16,
    likes: 13
  }
];

const trendingConversations = [
  {
    id: 't1',
    title: 'When should a family bring in an external CIO?',
    author: { name: 'Rohan Kapoor', avatar: 'https://i.pravatar.cc/100?img=11' },
    timeAgo: '5h ago',
    category: 'Family Office',
    views: 124,
    replies: 27,
    likes: 14
  },
  {
    id: 't2',
    title: 'Are private markets still worth the complexity?',
    author: { name: 'Neha Sethi', avatar: 'https://i.pravatar.cc/100?img=9' },
    timeAgo: '10h ago',
    category: 'Investments',
    views: 86,
    replies: 12,
    likes: 8
  },
  {
    id: 't3',
    title: 'How much liquidity should a family office really maintain?',
    author: { name: 'Vikram Rao', avatar: 'https://i.pravatar.cc/100?img=13' },
    timeAgo: '14h ago',
    category: 'Investments',
    views: 312,
    replies: 34,
    likes: 21
  },
  {
    id: 't4',
    title: 'What should a family office never outsource?',
    author: { name: 'Meera Iyer', avatar: 'https://i.pravatar.cc/100?img=5' },
    timeAgo: '16h ago',
    category: 'Best Practices',
    views: 67,
    replies: 9,
    likes: 6
  }
];

const categories = [
  { name: 'All categories', count: '1.2K', isActive: true },
  { name: 'General', count: '236', isActive: false },
  { name: 'Best Practices', count: '186', isActive: false },
  { name: 'Product/AV', count: '142', isActive: false },
  { name: 'Family Office', count: '201', isActive: false },
  { name: 'Investments', count: '248', isActive: false },
  { name: 'Accounting', count: '98', isActive: false },
  { name: 'Technology', count: '154', isActive: false },
  { name: 'Industry Trends', count: '179', isActive: false }
];

const activeDiscussions = [
  { title: 'How do you evaluate a fund manager beyond past performance?', author: 'Priya Mehta', timeAgo: '2h ago', category: 'Investments' },
  { title: 'What cybersecurity risks should family offices be most concerned about?', author: 'Priya Mehta', timeAgo: '2h ago', category: 'Investments' },
  { title: 'Has anyone created a family constitution that actually works?', author: 'Priya Mehta', timeAgo: '2h ago', category: 'Investments' }
];

const activeMembers = [
  { name: 'Priya Mehta', contributions: '152', avatar: 'https://i.pravatar.cc/100?img=5' },
  { name: 'Rajan Bansal', contributions: '128', avatar: 'https://i.pravatar.cc/100?img=8' },
  { name: 'Poonam Shah', contributions: '112', avatar: 'https://i.pravatar.cc/100?img=9' },
  { name: 'Rajeev Kapoor', contributions: '98', avatar: 'https://i.pravatar.cc/100?img=11' },
  { name: 'Vaayu Rajan', contributions: '90', avatar: 'https://i.pravatar.cc/100?img=13' },
  { name: 'Amit Ameta', contributions: '87', avatar: 'https://i.pravatar.cc/100?img=12' }
];

const popularTags = [
  { name: 'investments', count: 122 },
  { name: 'bestpractices', count: 89 },
  { name: 'governance', count: 56 },
  { name: 'family-office', count: 71 },
  { name: 'technology', count: 34 },
  { name: 'networks', count: 51 }
];

export default async function DiscussionPage() {
  const live = await loadDiscussions();
  const data = {
    latest: live?.latest.length ? live.latest : latestConversations,
    trending: live?.trending.length ? live.trending : trendingConversations,
    categories: live?.categories.length > 1 ? live.categories : categories,
    recentlyActive: live?.recentlyActive.length ? live.recentlyActive : activeDiscussions,
    members: live?.members.length ? live.members : activeMembers,
    tags: live?.tags.length ? live.tags : popularTags,
  };

  return (
    <div className="container min-h-screen" style={{ paddingBottom: 'calc(4 * var(--sa))' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Discussion' }]} />

      <EventBanner topic={live?.trending[0]} />

      <div className="flex max-lg:flex-col" style={{ gap: 'calc(1.5 * var(--sa))', marginBottom: 'calc(1.5 * var(--sa))' }}>
        <div className="flex-[1_1_67%] min-w-0">
          <ConversationList title="LATEST CONVERSATIONS" conversations={data.latest} showViewAll={true} />
        </div>
        <div className="flex-[1_1_33%] min-w-0">
          <CategoryList categories={data.categories} />
        </div>
      </div>

      <div className="flex max-lg:flex-col" style={{ gap: 'calc(1.5 * var(--sa))' }}>
        <div className="flex-[1_1_67%] min-w-0 flex flex-col" style={{ gap: 'calc(1.5 * var(--sa))' }}>
          <ActiveDiscussionsList discussions={data.recentlyActive} />
          <TrendingDiscussions conversations={data.trending} />
          
          <Reveal className="rounded-2xl overflow-hidden" style={{ height: 'calc(18 * var(--da) + var(--db))', marginTop: 'calc(1 * var(--sa))' }}>
             <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Discussion bottom banner" />
          </Reveal>
        </div>
        
        <div className="flex-[1_1_33%] min-w-0 flex flex-col" style={{ gap: 'calc(1.5 * var(--sa))' }}>
          <ActiveMembersList members={data.members} />
          <PopularTagsList tags={data.tags} />
        </div>
      </div>
    </div>
  );
}
