import React from 'react';
import { PageHero } from '@/components/ui/PageHero';

// Trending discussion banner at the top of the discussions page.
export function EventBanner() {
  return (
    <PageHero
      image="/images/discussionbanner.png"
      label="TRENDING DISCUSSION"
      title="Navigating market volatility: Strategies for family portfolios"
      titleWidth="min(23vw, 300px)"
      actions={[{ label: 'READ MORE', href: '/conversations/101', arrow: true }]}
      arrows
      spacious
    />
  );
}
