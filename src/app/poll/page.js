'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
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
    <div className="container min-h-screen" style={{ paddingBottom: '4vw' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Poll' }]} />

      <TrendingPoll />

      {/* Recent Polls + Take Poll side-by-side */}
      <div className="flex" style={{ gap: '1.5vw', marginBottom: '2vw' }}>
        <div className="flex-[1_1_58%]" style={{ minWidth: '40vw' }}>
          <RecentPollsList
            polls={recentPollsData}
            activePollId={activePoll.id}
            onPollSelect={setActivePoll}
          />
        </div>
        <div className="flex-[1_1_42%]" style={{ minWidth: '28vw' }}>
          <TakePollDetail poll={activePoll} />
        </div>
      </div>

      {/* Closed Polls */}
      <div style={{ backgroundColor: '#eef1f5', padding: '3.5vw 4vw', borderRadius: '1.2vw', marginTop: '1vw' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '3vw' }}>
          <h3 className="font-semibold text-[#132742] uppercase" style={{ fontSize: '0.9vw', letterSpacing: '0.1em' }}>CLOSED POLLS</h3>
          <Link href="/poll/closed" className="text-[#00A4E4] font-medium hover:underline flex items-center" style={{ gap: '0.4vw', fontSize: '0.75vw' }}>
            VIEW ALL
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '0.8vw', height: '0.8vw' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="flex" style={{ gap: '2vw' }}>
          {closedPollsData.map((poll, idx) => (
            <div key={poll.id} className="flex-1" style={{ padding: '0 2vw', borderRight: idx !== closedPollsData.length - 1 ? '1px solid #d1d5db' : 'none' }}>
              <PollResultCard question={poll.question} options={poll.options} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
