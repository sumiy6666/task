import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PageHero } from '@/components/ui/PageHero';
import CommunityBanner from '@/components/events/CommunityBanner';
import { OfferCards } from '@/components/about/OfferCards';
import { TwoSides } from '@/components/about/TwoSides';
import { StartSteps } from '@/components/about/StartSteps';
import styles from '@/components/about/About.module.css';

export const metadata = {
  title: 'About Us | AV CIRCLE',
  description: 'A community built for the people behind family office accounting and operations.'
};

export default function AboutPage() {
  return (
    <div className={`container min-h-screen ${styles.page}`}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />

      <PageHero
        image="/images/aboutbanner.png"
        label="ABOUT AV COMMUNITY"
        title="A community built for the people behind family office accounting and operations."
        titleWidth="min(36.9vw, 480px)"
        text="Connect with peers, learn from real world experience, build your AV knowledge and stay closer to the ideas shaping better financial operations."
        actions={[
          { label: 'Explore the community', href: '/discussions', arrow: true },
          { label: 'Start a conversation', href: '/conversations/new', variant: 'solid' }
        ]}
      />

      <div className={styles.stack}>
        <OfferCards />
        <TwoSides />
        <StartSteps />
      </div>

      <CommunityBanner
        title="The community gets better when experience is shared."
        text=""
        linkLabel="Start a Conversation"
        href="/conversations/new"
      />
    </div>
  );
}
