'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
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
    <div className="container min-h-screen" style={{ paddingBottom: 'calc(4 * var(--sa))' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Member Directory' }]} />

      <MemberDirectoryFilters />

      {/* Members List + Detail side-by-side */}
      <div className="flex max-lg:flex-col" style={{ gap: 'calc(1.5 * var(--sa))' }}>
        <div className="flex-[1_1_55%]" style={{ minWidth: 'min(100%, calc(40 * var(--da) + var(--db)))' }}>
          <MembersList
            members={membersData}
            activeMemberId={activeMember.id}
            onMemberSelect={setActiveMember}
          />
        </div>
        <div className="flex-[1_1_45%]" style={{ minWidth: 'min(100%, calc(32 * var(--da) + var(--db)))' }}>
          <MemberDetail member={activeMember} />
        </div>
      </div>
    </div>
  );
}
