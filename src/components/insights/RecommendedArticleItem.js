import React from 'react';
import { ChartSpline, Earth, SquareActivity, SquarePercent } from 'lucide-react';
import { SidebarListItem } from './SidebarListItem';

// Chart, percent, globe and chart icons, as in the design.
const ICONS = [SquareActivity, SquarePercent, Earth, ChartSpline];

export function RecommendedArticleItem({ article, index = 0 }) {
  return (
    <SidebarListItem
      Icon={ICONS[index % ICONS.length]}
      title={article.title}
      href={typeof article.id === 'number' ? `/insights/${article.id}` : undefined}
      meta={article.readTime}
    />
  );
}
