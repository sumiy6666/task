// Sample profile content, shown until the forum supplies a member's own data.

const avatar = (img) => `https://i.pravatar.cc/160?img=${img}`;

export const SAMPLE_PROFILE = {
  name: 'Rohan Mehta',
  username: 'rohan.mehta',
  avatar: avatar(12),
  bio: 'Finance professional | Family office operations enthusiast. Passionate about process efficiency, knowledge sharing and building stronger communities.',
  followers: 150,
  following: 100,
  location: 'Mumbai, India',
  memberSince: 'Jan 2025',
  role: 'Admin',
};

export const GLANCE = [
  { icon: 'eye', value: '18', label: 'Days Visited' },
  { icon: 'clock', value: '3m', label: 'Read Time' },
  { icon: 'chat', value: '7', label: 'Posts read' },
  { icon: 'heart', value: '0', label: 'Given' },
  { icon: 'heart', value: '0', label: 'Received' },
  { icon: 'users', value: '0', label: 'Topics created' },
  { icon: 'pencil', value: '0', label: 'Posts created' },
];

export const ACTIVITY = [
  {
    id: 'a1',
    type: 'Topics',
    author: { name: 'Priya Mehta', avatar: avatar(47) },
    timeAgo: '2 weeks ago',
    action: 'Published a new article',
    title: 'Building Smarter Family Office Operations',
    text: 'In this article, I’ve shared some key lessons on how process clarity, the right tools, and open knowledge sharing can make family office operations more efficient and future-ready.',
    tags: ['FamilyOffice', 'Operations', 'KnowledgeSharing'],
    likes: 12,
    comments: 4,
    views: 156,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop',
    href: '/insights',
  },
];

const ROHAN = avatar(12);

export const NOTIFICATIONS = [
  { id: 'n1', group: 'Today', kind: 'Mention', avatar: ROHAN, title: 'Rohan Kapoor mentioned you in a comment', lines: ['“@priya.mehta would love to get your thoughts on this!”'], time: '1h ago', unread: true },
  { id: 'n2', group: 'Today', kind: 'Replies', avatar: ROHAN, title: 'Rohan Kapoor replied you in a comment', lines: ['This is really helpful. Have you also considered…'], time: '2h ago', unread: true },
  { id: 'n3', group: 'Today', kind: 'Updates', avatar: ROHAN, title: 'New discussion in investments', lines: ['Evaluating fund managers: key checklist', ['12 replies', '8 likes']], time: '3h ago', unread: true },
  { id: 'n4', group: 'Today', kind: 'Updates', avatar: ROHAN, title: 'Reminder: Upcoming events', lines: ['Navigating market volatility: Strategies for family portfolios', ['Wed, 12 June 2026', '4:00-5:00 PM (IST)']], time: '5h ago', unread: true },
  { id: 'n5', group: 'Yesterday', kind: 'Mention', avatar: ROHAN, title: 'You earned a new badge', lines: ['Enthusiast–Visited 10 consecutive days'], time: '1d ago', unread: false },
  { id: 'n6', group: 'Yesterday', kind: 'Mention', avatar: ROHAN, title: 'Neha Shah mentioned you in a poll', lines: ['“@priya.mehta what does your office use?”'], time: '1d ago', unread: false },
  { id: 'n7', group: 'Yesterday', kind: 'Replies', avatar: ROHAN, title: 'Arvind Rajan replied to your discussion', lines: ['Agree with this, especially on liquidity buffers.'], time: '1d ago', unread: false },
  { id: 'n8', group: 'Yesterday', kind: 'Updates', avatar: ROHAN, title: 'New article in Insights', lines: ['The engagement letter decides what the family keeps'], time: '1d ago', unread: false },
];

export const THREADS = [
  {
    id: 't1',
    name: 'Rohan Kapoor',
    avatar: ROHAN,
    preview: 'That’s great.',
    time: '10:24 AM',
    unread: true,
    online: true,
    messages: [
      { from: 'them', text: 'Hi Priya, I went through the reporting checklist you shared last week. Very useful for our quarter-end close.', time: '10:12 AM' },
      { from: 'me', text: 'Glad it helped! I can also share the template we use for custodian reconciliations if you’d like.', time: '10:18 AM' },
      { from: 'them', text: 'That’s great.', time: '10:24 AM' },
    ],
  },
  { id: 't2', name: 'Neha Shah', avatar: ROHAN, preview: 'Thanks for sharing the deck!', time: 'Yesterday', messages: [{ from: 'them', text: 'Thanks for sharing the deck!', time: 'Yesterday' }] },
  { id: 't3', name: 'AV Community team', avatar: ROHAN, preview: 'Welcome to AV Community', time: '2d ago', messages: [{ from: 'them', text: 'Welcome to AV Community', time: '2d ago' }] },
  { id: 't4', name: 'Arvind Rajan', avatar: ROHAN, preview: 'Would love to hear your thoughts on this.', time: '3d ago', messages: [{ from: 'them', text: 'Would love to hear your thoughts on this.', time: '3d ago' }] },
  { id: 't5', name: 'Isha Verma', avatar: ROHAN, preview: 'Let me know once the notes are ready.', time: '3d ago', messages: [{ from: 'them', text: 'Let me know once the notes are ready.', time: '3d ago' }] },
];

const invite = (id) => ({ id, name: 'Rohan Kapoor', avatar: ROHAN, role: 'Principal', company: 'Kapoor Family Office', time: '2d ago' });

export const INVITES = {
  received: [invite('i1'), invite('i2'), invite('i3')],
  sent: [
    { id: 's1', name: 'Neha Shah', avatar: ROHAN, role: 'Director', company: 'Shah Family Office', time: '1d ago' },
    { id: 's2', name: 'Arvind Rajan', avatar: ROHAN, role: 'CIO', company: 'Rajan Holdings', time: '4d ago' },
  ],
};

export const EARNED_BADGES = [
  { icon: 'chat', name: 'Conversation Starter', text: 'Started 10 discussions', earned: '12 Aug 2026' },
  { icon: 'users', name: 'Active Member', text: 'Posted 25 replies', earned: '25 Aug 2026' },
  { icon: 'star', name: 'Enthusiast', text: 'Visited 10 consecutive days', earned: '5 Sep 2026' },
  { icon: 'bulb', name: 'Knowledge Sharer', text: 'Shared 5 resources', earned: '8 Sep 2026' },
  { icon: 'heart', name: 'Helpful Peer', text: 'Received 25 likes', earned: '10 Sep 2026' },
  { icon: 'people', name: 'Community Builder', text: 'Invited 3 members', earned: '15 Sep 2026' },
];

export const UPCOMING_BADGES = [
  { icon: 'user', name: 'Thought Leader', text: 'Publish 5 articles', done: 2, total: 5 },
  { icon: 'calendar', name: 'Event Attendee', text: 'Attend 3 community events', done: 1, total: 3 },
  { icon: 'mentor', name: 'Mentor', text: 'Help 5 new members', done: 1, total: 5 },
  { icon: 'book', name: 'Research Contributor', text: 'Share 10 resources', done: 4, total: 10 },
  { icon: 'glasses', name: 'Discussion Expert', text: 'Get 100 upvotes', done: 25, total: 100 },
  { icon: 'gem', name: 'AV Champion', text: 'Be active for 6 months', done: 2, total: 6 },
];
