'use client';
import { useState } from 'react';
import { Activity, Bell, MessageSquare, Shield, UserPlus, UserRound } from 'lucide-react';
import { Breadcrumb } from '../ui/Breadcrumb';
import { ProfileHeader } from './ProfileHeader';
import { ProfileTabs } from './ProfileTabs';
import { SummaryPanel } from './SummaryPanel';
import { ActivityPanel } from './ActivityPanel';
import { NotificationsPanel } from './NotificationsPanel';
import { MessagesPanel } from './MessagesPanel';
import { InvitesPanel } from './InvitesPanel';
import { BadgesPanel } from './BadgesPanel';
import styles from './Profile.module.css';

export const PROFILE_TABS = [
  { id: 'summary', label: 'Summary', icon: UserRound },
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'invites', label: 'Invites', icon: UserPlus },
  { id: 'badges', label: 'Badges', icon: Shield },
];

// My Profile: header card, tab bar, and the open tab. The tab is kept in the
// address (?tab=badges) so it can be linked to and survives a reload.
export function ProfilePageView({ profile, initialTab = 'summary' }) {
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
        {tab === 'summary' && <SummaryPanel onShowBadges={() => show('badges')} />}
        {tab === 'activity' && <ActivityPanel />}
        {tab === 'notifications' && <NotificationsPanel />}
        {tab === 'messages' && <MessagesPanel />}
        {tab === 'invites' && <InvitesPanel />}
        {tab === 'badges' && <BadgesPanel />}
      </div>
    </main>
  );
}
