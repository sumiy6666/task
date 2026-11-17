import { PageHero } from '@/components/ui/PageHero';

// The About Us photo banner. It also sits at the top of the home page.
export function AboutBanner() {
  return (
    <PageHero
      image="/images/aboutbanner.png"
      label="ABOUT AV COMMUNITY"
      title="A community built for the people behind family office accounting and operations."
      titleWidth="min(36.9vw, 480px)"
      text="Connect with peers, learn from real world experience, build your AV knowledge and stay closer to the ideas shaping better financial operations."
      actions={[{ label: 'Explore the community', href: '/discussions', arrow: true }]}
    />
  );
}
