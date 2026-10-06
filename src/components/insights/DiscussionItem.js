import React from 'react';
import { ChartNoAxesColumnIncreasing, CirclePercent, ShieldCheck, SquareCheckBig } from 'lucide-react';
import { Separator, SidebarListItem } from './SidebarListItem';

const ICONS = [CirclePercent, ShieldCheck, ChartNoAxesColumnIncreasing, SquareCheckBig];

export function DiscussionItem({ discussion, index = 0 }) {
  return (
    <SidebarListItem
      Icon={ICONS[index % ICONS.length]}
      title={discussion.title}
      meta={<>{discussion.replies} replies<Separator />{discussion.timeAgo}</>}
    />
  );
}
