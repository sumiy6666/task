'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import MemberDirectoryFilters from '@/components/members/MemberDirectoryFilters';
import MembersList from '@/components/members/MembersList';
import MemberDetail from '@/components/members/MemberDetail';
import styles from '@/components/members/Members.module.css';

const SAMPLE_BIO = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const SAMPLE_EXPERTISE = ['Private Equity', 'Governance', 'Strategy'];

// Sample data, shown when Discourse is not connected.
const sample = (id, name, img, extra = {}) => ({
  id,
  name,
  role: 'Lorem Ipsum',
  company: 'Lorem Ipsum',
  location: 'Gurgaon',
  avatar: `https://i.pravatar.cc/200?img=${img}`,
  expertise: SAMPLE_EXPERTISE,
  bio: SAMPLE_BIO,
  stats: { discussions: 18, contributions: 24, followers: 55 },
  ...extra
});

const membersData = [
  sample(1, 'Priya Lamba', 47, { role: 'Managing Partner', company: 'Company name' }),
  sample(2, 'Snehashish Rana', 59, { stats: { discussions: 12, contributions: 34, followers: 89 } }),
  sample(3, 'Harmanpreet Reddy', 44, { stats: { discussions: 5, contributions: 21, followers: 45 } }),
  sample(4, 'Rohit Dhoni', 68, { stats: { discussions: 9, contributions: 16, followers: 38 } }),
  sample(5, 'Smriti Yadav', 45, { stats: { discussions: 14, contributions: 29, followers: 61 } }),
  sample(6, 'Priyadarsh Praduman', 12, { stats: { discussions: 7, contributions: 19, followers: 42 } })
];

export default function MembersPageView({ members = membersData }) {
  const [activeMember, setActiveMember] = useState(members[0] || null);

  return (
    <div className={`container min-h-screen ${styles.page}`}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Member Directory' }]} />

      <MemberDirectoryFilters />

      {/* Members list (white) and the selected profile (grey) share one card. */}
      <div className={styles.card}>
        <div className={styles.listCol}>
          <MembersList
            members={members}
            activeMemberId={activeMember?.id}
            onMemberSelect={setActiveMember}
          />
        </div>
        <div className={styles.detailCol}>
          <MemberDetail member={activeMember} />
        </div>
      </div>
    </div>
  );
}
