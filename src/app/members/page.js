'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { EventBanner } from '@/components/discussions/EventBanner';
import MemberDirectoryFilters from '@/components/members/MemberDirectoryFilters';
import MembersList from '@/components/members/MembersList';
import MemberDetail from '@/components/members/MemberDetail';

const membersData = [
  {
    id: 1,
    name: 'Priya Lamba',
    role: 'Managing Partner',
    company: 'Company name',
    location: 'Location',
    avatar: 'https://i.pravatar.cc/150?img=5',
    expertise: ['Private Equity', 'Governance', 'Strategy'],
    bio: 'Bio goes here',
    stats: {
      discussions: 18,
      contributions: 18,
      followers: 18
    }
  },
  {
    id: 2,
    name: 'Priya Lamba',
    role: 'Lorem Ipsum',
    company: 'Lorem Ipsum',
    location: 'Location',
    avatar: 'https://i.pravatar.cc/150?img=9',
    expertise: ['Private Equity', 'Governance', 'Strategy'],
    bio: 'Experienced in alternative investments and long term portfolio construction for family offices.',
    stats: {
      discussions: 12,
      contributions: 34,
      followers: 89
    }
  },
  {
    id: 3,
    name: 'Priya Lamba',
    role: 'Lorem Ipsum',
    company: 'Lorem Ipsum',
    location: 'Location',
    avatar: 'https://i.pravatar.cc/150?img=1',
    expertise: ['Private Equity', 'Governance', 'Strategy'],
    bio: 'Bio goes here',
    stats: {
      discussions: 5,
      contributions: 21,
      followers: 45
    }
  },
  {
    id: 4,
    name: 'Priya Lamba',
    role: 'Lorem Ipsum',
    company: 'Lorem Ipsum',
    location: 'Location',
    avatar: 'https://i.pravatar.cc/150?img=2',
    expertise: ['Private Equity', 'Governance', 'Strategy'],
    bio: 'Bio goes here',
    stats: {
      discussions: 18,
      contributions: 18,
      followers: 18
    }
  },
  {
    id: 5,
    name: 'Priya Lamba',
    role: 'Lorem Ipsum',
    company: 'Lorem Ipsum',
    location: 'Location',
    avatar: 'https://i.pravatar.cc/150?img=3',
    expertise: ['Private Equity', 'Governance', 'Strategy'],
    bio: 'Bio goes here',
    stats: {
      discussions: 18,
      contributions: 18,
      followers: 18
    }
  }
];

export default function MembersPage() {
  const [activeMember, setActiveMember] = useState(membersData[0]);

  return (
    <div className="container min-h-screen" style={{ paddingBottom: '4vw' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Member Directory' }]} />

      <EventBanner />

      <MemberDirectoryFilters />

      {/* Members List + Detail side-by-side */}
      <div className="flex" style={{ gap: '1.5vw' }}>
        <div className="flex-[1_1_55%]" style={{ minWidth: '40vw' }}>
          <MembersList
            members={membersData}
            activeMemberId={activeMember.id}
            onMemberSelect={setActiveMember}
          />
        </div>
        <div className="flex-[1_1_45%]" style={{ minWidth: '32vw' }}>
          <MemberDetail member={activeMember} />
        </div>
      </div>
    </div>
  );
}
