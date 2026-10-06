import { Breadcrumb } from '@/components/ui/Breadcrumb';
import ClosedPollsGrid from '@/components/poll/ClosedPollsGrid';
import { loadPolls } from '@/lib/discourse/lists';

// Sample data, shown when Discourse is not connected.
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
  },
  {
    id: 7,
    question: 'Which asset class are you most likely to increase allocation to next year?',
    options: [
      { label: 'Private equity', percentage: '29%', highlighted: true },
      { label: 'Private credit', percentage: '24%', highlighted: false },
      { label: 'Real estate', percentage: '15%', highlighted: false },
      { label: 'Public equities', percentage: '18%', highlighted: false },
      { label: 'Fixed income', percentage: '14%', highlighted: false }
    ]
  },
  {
    id: 8,
    question: 'How often does your family office review its investment policy statement?',
    options: [
      { label: 'Quarterly', percentage: '11%', highlighted: false },
      { label: 'Twice a year', percentage: '19%', highlighted: false },
      { label: 'Annually', percentage: '42%', highlighted: true },
      { label: 'Every 2-3 years', percentage: '17%', highlighted: false },
      { label: 'Ad hoc', percentage: '11%', highlighted: false }
    ]
  },
  {
    id: 9,
    question: 'Are you currently using AI tools in your investment or operations workflow?',
    options: [
      { label: 'Yes, extensively', percentage: '9%', highlighted: false },
      { label: 'Yes, in a few areas', percentage: '34%', highlighted: true },
      { label: 'Piloting', percentage: '27%', highlighted: false },
      { label: 'Planning to', percentage: '18%', highlighted: false },
      { label: 'No plans', percentage: '12%', highlighted: false }
    ]
  },
  {
    id: 10,
    question: 'What is your primary approach to succession planning?',
    options: [
      { label: 'Formal written plan', percentage: '23%', highlighted: false },
      { label: 'Family governance council', percentage: '31%', highlighted: true },
      { label: 'Informal discussions', percentage: '26%', highlighted: false },
      { label: 'External advisors lead', percentage: '12%', highlighted: false },
      { label: 'Not yet addressed', percentage: '8%', highlighted: false }
    ]
  },
  {
    id: 11,
    question: 'How do you primarily source direct investment opportunities?',
    options: [
      { label: 'Personal network', percentage: '38%', highlighted: true },
      { label: 'Co-investment with funds', percentage: '22%', highlighted: false },
      { label: 'Family office peer clubs', percentage: '17%', highlighted: false },
      { label: 'Investment banks', percentage: '13%', highlighted: false },
      { label: 'Deal platforms', percentage: '10%', highlighted: false }
    ]
  },
  {
    id: 12,
    question: 'Which area are you prioritising for cybersecurity investment?',
    options: [
      { label: 'Staff training', percentage: '26%', highlighted: false },
      { label: 'Identity and access', percentage: '30%', highlighted: true },
      { label: 'Device security', percentage: '15%', highlighted: false },
      { label: 'Vendor risk', percentage: '16%', highlighted: false },
      { label: 'Incident response', percentage: '13%', highlighted: false }
    ]
  }
];

export default async function ClosedPollsPage() {
  const live = await loadPolls();
  const polls = live ? live.closed : allClosedPollsData;

  return (
    <div className="container min-h-screen" style={{ paddingBottom: 'calc(4 * var(--sa))' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Poll', href: '/poll' }, { label: 'Closed Polls' }]} />

      <div className="rounded-2xl" style={{ backgroundColor: '#eef1f5', padding: 'calc(3 * var(--sa))', borderRadius: 'calc(1.2 * var(--sa))' }}>
        <div style={{ marginBottom: 'calc(3 * var(--sa))' }}>
          <h3 className="font-semibold text-[#132742] uppercase" style={{ fontSize: 'calc(0.9 * var(--fa) + var(--fb))', letterSpacing: '0.1em' }}>CLOSED POLLS</h3>
        </div>

        {polls.length > 0 ? (
          <ClosedPollsGrid polls={polls} />
        ) : (
          <p className="text-[#6b7280]" style={{ fontSize: 'calc(0.85 * var(--fa) + var(--fb))' }}>No closed polls yet.</p>
        )}
      </div>
    </div>
  );
}
