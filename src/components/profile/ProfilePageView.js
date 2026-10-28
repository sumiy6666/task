'use client';
import { useState } from 'react';
import { Activity, Bell, MessageSquare, Shield, UserRound } from 'lucide-react';
import { Breadcrumb } from '../ui/Breadcrumb';
import { ProfileHeader } from './ProfileHeader';
import { ProfileTabs } from './ProfileTabs';
import { SummaryPanel } from './SummaryPanel';
import { ActivityPanel } from './ActivityPanel';
import { NotificationsPanel } from './NotificationsPanel';
import { MessagesPanel } from './MessagesPanel';
import { BadgesPanel } from './BadgesPanel';
import styles from './Profile.module.css';

export const PROFILE_TABS = [
  { id: 'summary', label: 'Summary', icon: UserRound },
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'badges', label: 'Badges', icon: Shield },
];

// My Profile: header card, tab bar, and the open tab. The tab is kept in the
// address (?tab=badges) so it can be linked to and survives a reload. `live`
// carries the member's forum stats, activity and badges; without it the tabs
// show sample content.
export function ProfilePageView({ profile, live = null, initialTab = 'summary', initialThread = null }) {
  const [tab, setTab] = useState(PROFILE_TABS.some((t) => t.id === initialTab) ? initialTab : 'summary');

  const show = (id) => {
    setTab(id);
    const url = new URL(window.location.href);
    if (id === 'summary') url.searchParams.delete('tab');
    else url.searchParams.set('tab', id);
    window.history.replaceState(null, '', url);
  };

  return (
    <main className={`container ${styles.page}`}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'My Profile' }]} />
      <ProfileHeader profile={profile} />
      <ProfileTabs tabs={PROFILE_TABS} active={tab} onChange={show} label="Profile sections" />

      <div role="tabpanel" key={tab} className="rise-in">
        {tab === 'summary' && <SummaryPanel glance={live?.glance} topBadges={live?.badges.earned.slice(0, 2)} onShowBadges={() => show('badges')} />}
        {tab === 'activity' && <ActivityPanel items={live?.activity} live={Boolean(live)} />}
        {tab === 'notifications' && <NotificationsPanel live={Boolean(live)} />}
        {tab === 'messages' && <MessagesPanel live={Boolean(live)} initialThreadId={/^\d+$/.test(String(initialThread || '')) ? initialThread : null} />}
        {tab === 'badges' && <BadgesPanel earnedBadges={live?.badges.earned} upcomingBadges={live?.badges.upcoming} />}
      </div>
    </main>
  );
}
