'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import TrendingPoll from '@/components/poll/TrendingPoll';
import RecentPollsList, { ViewAllLink } from '@/components/poll/RecentPollsList';
import TakePollDetail from '@/components/poll/TakePollDetail';
import PollResultCard from '@/components/poll/PollResultCard';
import { Reveal } from '@/components/ui/Reveal';
import pollStyles from '@/components/poll/Poll.module.css';

// Sample data, shown when Discourse is not connected.
const recentPollsData = [
  {
    id: 1,
    question: 'Which asset class has performed best for your office over the last 3 years?',
    category: 'Practice Operations',
    time: '5h ago',
    options: [
      { label: 'Private equity', percentage: '17%' },
      { label: 'Venture', percentage: '23%' },
      { label: 'Real estate', percentage: '11%' },
      { label: 'Public equities', percentage: '19%' },
      { label: 'Hedge funds', percentage: '14%' },
      { label: 'Fixed income', percentage: '16%' }
    ]
  },
  {
    id: 2,
    question: 'Do you use an outsourced CIO or manage investments entirely in-house?',
    category: 'Practice Operations',
    time: '5h ago',
    options: [
      { label: 'Fully in-house', percentage: '12%' },
      { label: 'Majority in-house, some outsourced', percentage: '25%' },
      { label: 'Hybrid — equally split', percentage: '18%' },
      { label: 'Majority outsourced (OCIO)', percentage: '21%' },
      { label: 'Fully outsourced', percentage: '24%' }
    ]
  },
  {
    id: 3,
    question: 'What is your biggest compliance challenge heading into 2026?',
    category: 'Practice Operations',
    time: '5h ago',
    options: [
      { label: 'AML / KYC requirements', percentage: '8%' },
      { label: 'Tax reporting complexity', percentage: '27%' },
      { label: 'Beneficial ownership rules', percentage: '16%' },
      { label: 'Data privacy', percentage: '28%' },
      { label: 'GDPR', percentage: '21%' }
    ]
  },
  {
    id: 4,
    question: 'How many full-time staff does your family office employ?',
    category: 'Practice Operations',
    time: '5h ago',
    options: [
      { label: '1-5 staff', percentage: '14%' },
      { label: '6-15 staff', percentage: '22%' },
      { label: '16-30 staff', percentage: '31%' },
      { label: '31-50 staff', percentage: '19%' },
      { label: '50+', percentage: '14%' }
    ]
  },
  {
    id: 5,
    question: 'What is the hardest part of performance evaluation and reporting?',
    category: 'Practice Operations',
    time: '5h ago',
    options: [
      { label: 'Benchmarking', percentage: '22%' },
      { label: 'Data aggregation', percentage: '30%' },
      { label: 'Client communication', percentage: '18%' },
      { label: 'Timeliness', percentage: '30%' }
    ]
  }
];

const closedPollsData = [
  {
    id: 10,
    question: 'Do you use an outsourced CIO or manage investments entirely in-house?',
    options: [
      { label: 'Fully in-house', percentage: '12%', highlighted: false },
      { label: 'Majority in-house, some outsourced', percentage: '25%', highlighted: true },
      { label: 'Hybrid — equally split', percentage: '18%', highlighted: false },
      { label: 'Majority outsourced (OCIO)', percentage: '21%', highlighted: false },
      { label: 'Fully outsourced', percentage: '24%', highlighted: false }
    ]
  },
  {
    id: 11,
    question: 'What is your biggest compliance challenge heading into 2026?',
    options: [
      { label: 'AML / KYC requirements', percentage: '8%', highlighted: false },
      { label: 'Tax reporting complexity', percentage: '27%', highlighted: false },
      { label: 'Beneficial ownership rules', percentage: '16%', highlighted: false },
      { label: 'Data privacy', percentage: '28%', highlighted: true },
      { label: 'GDPR', percentage: '21%', highlighted: false }
    ]
  },
  {
    id: 12,
    question: 'How many full-time staff does your family office employ?',
    options: [
      { label: '1-5 staff', percentage: '14%', highlighted: false },
      { label: '6-15 staff', percentage: '22%', highlighted: false },
      { label: '16-30 staff', percentage: '31%', highlighted: true },
      { label: '31-50 staff', percentage: '19%', highlighted: false },
      { label: '50+', percentage: '14%', highlighted: false }
    ]
  }
];

export default function PollPageView({ recentPolls = recentPollsData, closedPolls = closedPollsData }) {
  const [activePoll, setActivePoll] = useState(recentPolls[0] || null);
  // The most-voted open poll leads the page; sample mode keeps the designed banner.
  const trending = recentPolls === recentPollsData ? null : [...recentPolls].sort((a, b) => (b.voters || 0) - (a.voters || 0))[0];

  return (
    <div className="container min-h-screen" style={{ paddingBottom: 'calc(4 * var(--sa))' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Poll' }]} />

      <TrendingPoll poll={trending} />

      {/* Recent Polls + Take Poll side-by-side */}
      <div className="flex max-lg:flex-col" style={{ gap: 'calc(1.5 * var(--sa))', marginBottom: 'calc(2 * var(--sa))' }}>
        <div className="flex-[1_1_56%] min-w-0">
          <RecentPollsList
            polls={recentPolls}
            activePollId={activePoll?.id}
            onPollSelect={setActivePoll}
          />
        </div>
        <div className="flex-[1_1_44%] min-w-0">
          <TakePollDetail key={activePoll?.id} poll={activePoll} />
        </div>
      </div>

      {/* Closed Polls */}
      <div className={pollStyles.closed}>
        <div className={pollStyles.closedHeader}>
          <Reveal as="h3" className={pollStyles.panelTitle}>CLOSED POLLS</Reveal>
          <ViewAllLink href="/poll/closed" />
        </div>

        {closedPolls.length === 0 ? (
          <p className={pollStyles.meta}>No closed polls yet.</p>
        ) : (
          /* Three across on desktop; two on tablets and one on phones. */
          <Reveal stagger={150} className={pollStyles.closedGrid}>
            {closedPolls.map((poll) => (
              <div key={poll.id} className={`min-w-0 ${pollStyles.closedCol}`}>
                <PollResultCard question={poll.question} options={poll.options} />
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </div>
  );
}
