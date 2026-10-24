import { redirect } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Faq } from '@/components/ui/Faq';
import { PollWidget } from '@/components/home/PollWidget';
import { JoinHero } from '@/components/join/JoinHero';
import { WhyJoin } from '@/components/join/WhyJoin';
import { MemberVoices } from '@/components/join/MemberVoices';
import { getCurrentUser, isSignInEnabled } from '@/lib/discourse';
import { loadJoin } from '@/lib/discourse/lists';
import home from '@/app/page.module.css';
import styles from '@/components/join/Join.module.css';

export const metadata = {
  title: 'Join | AV Community',
  description: 'A free community where family office professionals swap notes, hear what’s working elsewhere and see what’s changing.',
};

// Offered as topics of interest when the forum can't be reached.
const SAMPLE_TOPICS = ['Reporting and Accounting', 'Tax & Legal', 'Technology and AI', 'Allocation Trends', 'Practice Operations', 'Structures and Cross-Border'];

const FAQS = [
  { q: 'What is AV Community?', a: 'A private community for the people who look after family wealth: finance, accounting, investment and operations teams in family offices. Members trade notes, take part in polls and meet at sessions and roundtables.' },
  { q: 'Who can join?', a: 'Anyone who works in or with a family office. Our team reviews each request to keep the community made up of peers.' },
  { q: 'Does it cost anything?', a: 'No. It’s free.' },
  { q: 'Do I need to use Asset Vantage to join?', a: 'No. The community is open to family office professionals whatever tools they use.' },
  { q: 'What is Asset Vantage?', a: 'A platform that brings a family’s investments, accounting and reporting together in one consolidated view. It began inside a family office that needed exactly that.' },
  { q: 'Who uses Asset Vantage?', a: 'Single and multi-family offices, and the finance and investment teams who run them.' },
];

// New members ask to join here; signed-in members have nothing to do.
export default async function JoinPage() {
  if (isSignInEnabled() && (await getCurrentUser().catch(() => null))) redirect('/');
  const live = await loadJoin();

  return (
    <main className={`container min-h-screen ${home.main} ${styles.page}`}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Join' }]} />
      <JoinHero topics={live?.topics?.length ? live.topics : SAMPLE_TOPICS} />
      <WhyJoin />
      <MemberVoices />

      <section className={home.gridRow}>
        <div className={home.colPoll}>
          <PollWidget poll={live?.poll} />
        </div>
        <div className={home.colNews}>
          <Faq items={FAQS} defaultOpen={2} />
        </div>
      </section>
    </main>
  );
}
