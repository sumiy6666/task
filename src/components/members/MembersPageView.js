'use client';

import { useMemo, useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import MemberDirectoryFilters, { EMPTY_FILTERS } from '@/components/members/MemberDirectoryFilters';
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
  memberType: 'Member',
  stats: { discussions: 18, contributions: 24, followers: 55 },
  ...extra
});

const membersData = [
  sample(1, 'Priya Lamba', 47, { role: 'Managing Partner', company: 'Company name', memberType: 'Admin' }),
  sample(2, 'Snehashish Rana', 59, { stats: { discussions: 12, contributions: 34, followers: 89 } }),
  sample(3, 'Harmanpreet Reddy', 44, { stats: { discussions: 5, contributions: 21, followers: 45 } }),
  sample(4, 'Rohit Dhoni', 68, { stats: { discussions: 9, contributions: 16, followers: 38 } }),
  sample(5, 'Smriti Yadav', 45, { stats: { discussions: 14, contributions: 29, followers: 61 } }),
  sample(6, 'Priyadarsh Praduman', 12, { stats: { discussions: 7, contributions: 19, followers: 42 } })
];

// Every distinct value of one member field, A to Z, for a filter's options.
const valuesOf = (members, key) => [...new Set(members.flatMap((m) => (Array.isArray(m[key]) ? m[key] : [m[key]])).filter(Boolean))]
  .sort((a, b) => a.localeCompare(b));

const matches = (member, f) =>
  (!f.name || member.name.toLowerCase().includes(f.name.trim().toLowerCase()) || member.username?.toLowerCase().includes(f.name.trim().toLowerCase())) &&
  (!f.role || member.role === f.role) &&
  (!f.company || member.company === f.company) &&
  (!f.location || member.location === f.location) &&
  (!f.expertise || member.expertise.includes(f.expertise)) &&
  (!f.memberType || member.memberType === f.memberType);

export default function MembersPageView({ members = membersData, live = false }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [activeId, setActiveId] = useState(members[0]?.id ?? null);

  const options = useMemo(() => ({
    role: valuesOf(members, 'role'),
    company: valuesOf(members, 'company'),
    location: valuesOf(members, 'location'),
    expertise: valuesOf(members, 'expertise'),
    memberType: valuesOf(members, 'memberType'),
  }), [members]);
  const filtered = useMemo(() => members.filter((m) => matches(m, filters)), [members, filters]);
  // The selected profile stays while it is in the results; otherwise the first result shows.
  const activeMember = filtered.find((m) => m.id === activeId) || filtered[0] || null;

  return (
    <div className={`container min-h-screen ${styles.page}`}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Member Directory' }]} />

      <MemberDirectoryFilters values={filters} options={options} onChange={setFilters} onClear={() => setFilters(EMPTY_FILTERS)} />

      {/* Members list (white) and the selected profile (grey) share one card. */}
      <div className={styles.card}>
        <div className={styles.listCol}>
          <MembersList
            key={JSON.stringify(filters)}
            members={filtered}
            activeMemberId={activeMember?.id}
            onMemberSelect={(m) => setActiveId(m.id)}
          />
        </div>
        <div className={styles.detailCol}>
          <MemberDetail member={activeMember} live={live} />
        </div>
      </div>
    </div>
  );
}
