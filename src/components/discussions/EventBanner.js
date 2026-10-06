import React from 'react';
import { PageHero } from '@/components/ui/PageHero';

// Trending discussion banner at the top of the discussions page: the forum's
// top topic when connected, the sample headline otherwise.
export function EventBanner({ topic }) {
  return (
    <PageHero
      image="/images/discussionbanner.png"
      label="TRENDING DISCUSSION"
      title={topic?.title || 'Navigating market volatility: Strategies for family portfolios'}
      titleWidth="min(23vw, 300px)"
      actions={[{ label: 'READ MORE', href: topic ? `/conversations/${topic.id}` : '/discussions', arrow: true }]}
      arrows
      spacious
    />
  );
}
