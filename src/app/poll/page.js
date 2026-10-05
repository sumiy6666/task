'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import TrendingPoll from '@/components/poll/TrendingPoll';
import RecentPollsList from '@/components/poll/RecentPollsList';
import TakePollDetail from '@/components/poll/TakePollDetail';
import PollResultCard from '@/components/poll/PollResultCard';

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

export default function PollPage() {
  const [activePoll, setActivePoll] = useState(recentPollsData[0]);

  return (
    <div className="container min-h-screen" style={{ paddingBottom: 'calc(4 * var(--sa))' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Poll' }]} />

      <TrendingPoll />

      {/* Recent Polls + Take Poll side-by-side */}
      <div className="flex max-lg:flex-col" style={{ gap: 'calc(1.5 * var(--sa))', marginBottom: 'calc(2 * var(--sa))' }}>
        <div className="flex-[1_1_58%]" style={{ minWidth: 'min(100%, calc(40 * var(--da) + var(--db)))' }}>
          <RecentPollsList
            polls={recentPollsData}
            activePollId={activePoll.id}
            onPollSelect={setActivePoll}
          />
        </div>
        <div className="flex-[1_1_42%]" style={{ minWidth: 'min(100%, calc(28 * var(--da) + var(--db)))' }}>
          <TakePollDetail poll={activePoll} />
        </div>
      </div>

      {/* Closed Polls */}
      <div style={{ backgroundColor: '#eef1f5', padding: 'calc(3.5 * var(--sa)) calc(4 * var(--sa))', borderRadius: 'calc(1.2 * var(--sa))', marginTop: 'calc(1 * var(--sa))' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 'calc(3 * var(--sa))' }}>
          <Reveal as="h3" className="font-semibold text-[#132742] uppercase" style={{ fontSize: 'calc(0.9 * var(--fa) + var(--fb))', letterSpacing: '0.1em' }}>CLOSED POLLS</Reveal>
          <Link href="/poll/closed" className="text-[#00A4E4] font-medium hover:underline flex items-center" style={{ gap: 'calc(0.4 * var(--sa))', fontSize: 'calc(0.75 * var(--fa) + var(--fb))' }}>
            VIEW ALL
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 'calc(0.8 * var(--da) + var(--db))', height: 'calc(0.8 * var(--da) + var(--db))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* One row on desktop; two columns on tablets and a single column on phones. */}
        <Reveal stagger={150} className="flex max-lg:flex-wrap max-sm:flex-col" style={{ gap: 'calc(2 * var(--sa))' }}>
          {closedPollsData.map((poll) => (
            <div key={poll.id} className="flex-1 min-w-0 max-lg:basis-[calc(50%-1rem)] border-r border-[#d1d5db] last:border-r-0 max-lg:border-r-0" style={{ padding: '0 calc(2 * var(--sa))' }}>
              <PollResultCard question={poll.question} options={poll.options} />
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
