import { Breadcrumb } from '@/components/ui/Breadcrumb';
import PollResultCard from '@/components/poll/PollResultCard';

const allClosedPollsData = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    question: 'How many full-time staff does your family office employ?',
    options: [
      { label: '1-5 staff', percentage: '14%', highlighted: false },
      { label: '6-15 staff', percentage: '22%', highlighted: false },
      { label: '16-30 staff', percentage: '31%', highlighted: true },
      { label: '31-50 staff', percentage: '19%', highlighted: false },
      { label: '50+', percentage: '14%', highlighted: false }
    ]
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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

export default function ClosedPollsPage() {
  return (
    <div className="container min-h-screen" style={{ paddingBottom: '4vw' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Poll', href: '/poll' }, { label: 'Closed Polls' }]} />

      <div className="rounded-2xl" style={{ backgroundColor: '#eef1f5', padding: '3vw', borderRadius: '1.2vw' }}>
        <div style={{ marginBottom: '3vw' }}>
          <h3 className="font-semibold text-[#132742] uppercase" style={{ fontSize: '0.9vw', letterSpacing: '0.1em' }}>CLOSED POLLS</h3>
        </div>

        <div className="grid grid-cols-3" style={{ rowGap: '4vw' }}>
          {allClosedPollsData.map((poll, idx) => {
            const isRightColumn = (idx + 1) % 3 === 0;
            const isMiddleColumn = idx % 3 === 1;
            return (
              <div
                key={poll.id}
                style={{
                  ...(isMiddleColumn ? { paddingLeft: '3vw', paddingRight: '3vw' } : {}),
                  ...(!isRightColumn && !isMiddleColumn ? { paddingRight: '3vw' } : {}),
                  ...(isRightColumn ? { paddingLeft: '3vw' } : {}),
                  ...(!isRightColumn ? { borderRight: '1px solid #d1d5db' } : {})
                }}
              >
                <PollResultCard question={poll.question} options={poll.options} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
