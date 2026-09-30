// Demo data used when Discourse is not configured, so the UI can be developed
// and reviewed offline. Each request rebuilds the demo store from the seed
// topics plus the visitor's own actions (see ./demo-session.js), so it works
// the same on every serverless instance.

const BODY =
  '<p>I’m curious to learn, from this community-what approaches are family offices using to baalnce liquidity, return expectations and portfolio flexibility? Are there any frameworks, tools or strategies that have worked well for you, especially in volatile markets?</p><p>Would love to hear your experience, lessons learnt, or resources you’d reccomend!</p>';
const REPLY =
  '<p>I’m curious to learn, from this community-what approaches are family offices using to baalnce liquidity, return expectations and portfolio flexibility? Are there any frameworks, tools or strategies that have worked well for you, especially in volatile markets?</p>';

const avatar = (n) => `https://i.pravatar.cc/150?img=${n}`;

export const mockUser = { username: 'priya.mehta', name: 'Priya Mehta', avatar: avatar(5) };

export const mockCategories = [
  { id: 1, name: 'General', slug: 'general', isPoll: false },
  { id: 2, name: 'Poll', slug: 'poll', isPoll: true },
  { id: 3, name: 'Best Practices', slug: 'best-practices', isPoll: false },
  { id: 4, name: 'Family Office', slug: 'family-office', isPoll: false },
  { id: 5, name: 'Investments', slug: 'investments', isPoll: false },
  { id: 6, name: 'Accounting', slug: 'accounting', isPoll: false },
  { id: 7, name: 'Technology', slug: 'technology', isPoll: false },
  { id: 8, name: 'Industry Trends', slug: 'industry-trends', isPoll: false },
];

const hoursAgo = (h) => new Date(Date.now() - h * 3600_000).toISOString();

const related = [
  { id: 102, title: 'How do yo approach next-gen engagement in your family office?', avatar: avatar(11) },
  { id: 103, title: 'Views on direct indexing for concentrated portfolios', avatar: avatar(12) },
  { id: 104, title: 'Using AI for research and portfolio monitoring', avatar: avatar(9) },
];

function seedTopic(id, title, author, extra = {}) {
  return {
    id,
    title,
    categoryName: 'Investments',
    tags: ['FamilyOffice', 'Investments', 'BestPractices', 'Liquidity'],
    firstPost: { id: id * 10, postNumber: 1, author, html: BODY, createdAt: hoursAgo(2), bookmarked: false },
    replies: [
      {
        id: id * 10 + 1,
        postNumber: 2,
        author: { username: 'rohan.kapoor', name: 'Rohan Kapoor', avatar: avatar(5) },
        html: REPLY,
        createdAt: hoursAgo(1.5),
        children: [
          {
            id: id * 10 + 2,
            postNumber: 3,
            replyToPostNumber: 2,
            author: mockUser,
            html: REPLY,
            createdAt: hoursAgo(1.2),
            children: [],
          },
        ],
      },
      {
        id: id * 10 + 3,
        postNumber: 4,
        author: { username: 'arvind.rajan', name: 'Arvind Rajan', avatar: avatar(5) },
        html: REPLY,
        createdAt: hoursAgo(1),
        children: [],
      },
    ],
    replyCount: 24,
    likeCount: 15,
    views: 1200,
    lastActivityAt: hoursAgo(1),
    related: related.filter((r) => r.id !== id),
    ...extra,
  };
}

// Seed topics, freshly built so each request can mutate its own copy.
export function createStore() {
  const store = new Map();
  store.set(101, seedTopic(101, 'Best practices for managing liquid investments in family portfolios?', mockUser));
  for (const r of related) {
    store.set(r.id, seedTopic(r.id, r.title, { username: 'member', name: 'Rohan Kapoor', avatar: r.avatar }));
  }
  return store;
}

export function nextTopicId(store) {
  return Math.max(...store.keys()) + 1;
}

export function mockGetTopic(store, id) {
  return store.get(Number(id)) || null;
}

const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Rough stand-in for Discourse's "cooked" HTML: paragraphs plus poll options as a list.
function cook(raw) {
  return raw
    .split(/\n{2,}/)
    .filter((block) => block.trim())
    .map((block) => {
      const poll = block.match(/\[poll[^\]]*\]([\s\S]*?)\[\/poll\]/);
      if (poll) {
        const items = poll[1].split('\n').filter((l) => l.startsWith('* ')).map((l) => `<li>${escapeHtml(l.slice(2))}</li>`);
        return `<ul class="poll-options">${items.join('')}</ul>`;
      }
      return `<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

function parsePolls(raw) {
  return [...raw.matchAll(/\[poll([^\]]*)\]([\s\S]*?)\[\/poll\]/g)].map((m, i) => ({
    name: 'poll',
    type: /type=multiple/.test(m[1]) ? 'multiple' : 'regular',
    status: 'open',
    closesAt: m[1].match(/close="([^"]+)"/)?.[1] || null,
    isPublic: /public=true/.test(m[1]),
    voters: 0,
    options: m[2].split('\n').filter((l) => l.startsWith('* ')).map((l, j) => ({ id: `opt${i}-${j}`, text: l.slice(2), votes: 0 })),
    userVotes: [],
  }));
}

function vote(store, { postId, pollName, optionIds }) {
  for (const topic of store.values()) {
    if (topic.firstPost?.id !== Number(postId)) continue;
    const poll = topic.firstPost.polls?.find((p) => p.name === pollName);
    if (!poll) return null;
    if (poll.userVotes.length === 0) poll.voters += 1;
    for (const o of poll.options) {
      if (poll.userVotes.includes(o.id)) o.votes -= 1;
      if (optionIds.includes(o.id)) o.votes += 1;
    }
    poll.userVotes = optionIds;
    return poll;
  }
  return null;
}

function createTopic(store, { id, title, raw, categoryId, tags = [], at }) {
  store.set(id, {
    ...seedTopic(id, title, mockUser),
    categoryName: mockCategories.find((c) => c.id === categoryId)?.name || 'General',
    tags,
    firstPost: { id: id * 10, postNumber: 1, author: mockUser, html: cook(raw.replace(/\[poll[\s\S]*?\[\/poll\]/g, '')), createdAt: at, polls: parsePolls(raw) },
    replies: [],
    replyCount: 0,
    likeCount: 0,
    views: 0,
    lastActivityAt: at,
  });
  return { topicId: id };
}

function createReply(store, { topicId, raw, replyToPostNumber, at }) {
  const topic = store.get(Number(topicId));
  if (!topic) return null;
  const all = [topic.firstPost, ...topic.replies.flatMap((r) => [r, ...r.children])];
  const postNumber = Math.max(...all.map((p) => p.postNumber)) + 1;
  const post = { id: topic.id * 1000 + postNumber, postNumber, author: mockUser, html: cook(raw), createdAt: at, children: [] };
  const parent = topic.replies.find((r) => r.postNumber === replyToPostNumber || r.children.some((c) => c.postNumber === replyToPostNumber));
  if (parent) parent.children.push({ ...post, replyToPostNumber });
  else topic.replies.push(post);
  topic.replyCount += 1;
  topic.lastActivityAt = at;
  return { postId: post.id };
}

// Applies one recorded visitor action to the store and returns its result.
export function applyOp(store, op) {
  switch (op.t) {
    case 'topic':
      return createTopic(store, op);
    case 'reply':
      return createReply(store, op);
    case 'vote':
      return vote(store, op);
    default:
      return null;
  }
}
