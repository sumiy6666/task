// Sample conversations, shown when Discourse is not connected (or a sample
// discussion card is opened). Shaped like mapTopic() output.

const BODY = 'I’m curious to learn, from this community, what approaches are family offices using to balance liquidity, return expectations and portfolio flexibility? Are there any frameworks, tools or strategies that have worked well for you, especially in volatile markets?';
const hoursAgo = (h) => new Date(Date.now() - h * 3600 * 1000).toISOString();

const author = (name, img) => ({ username: name.toLowerCase().replace(/\s+/g, ''), name, avatar: `https://i.pravatar.cc/160?img=${img}` });

function bestPractices() {
  return {
    id: 'sample-201',
    title: 'Best practices for managing liquid investments in family portfolios?',
    categoryName: 'Investments',
    tags: ['FamilyOffice', 'Investments', 'BestPractices', 'Liquidity'],
    firstPost: {
      id: 'sample-post-1',
      postNumber: 1,
      author: author('Priya Mehta', 47),
      html: `<p>${BODY}</p><p>Would love to hear your experience, lessons learnt, or resources you’d recommend!</p>`,
      createdAt: hoursAgo(2),
      bookmarked: false,
      liked: false,
      polls: [],
    },
    replies: [
      {
        id: 'sample-post-2',
        postNumber: 2,
        author: author('Rohan Kapoor', 11),
        html: `<p>${BODY}</p>`,
        children: [
          { id: 'sample-post-3', postNumber: 3, author: author('Priya Mehta', 47), html: `<p>${BODY}</p>`, children: [] },
        ],
      },
      { id: 'sample-post-4', postNumber: 4, author: author('Arvind Rajan', 60), html: `<p>${BODY}</p>`, children: [] },
    ],
    replyCount: 24,
    likeCount: 15,
    views: 1200,
    lastActivityAt: hoursAgo(1),
    related: [
      { id: 'sample-202', title: 'How do yo approach next-gen engagement in your family office?', avatar: 'https://i.pravatar.cc/160?img=12' },
      { id: 'sample-203', title: 'Views on direct indexing for concentrated portfolios', avatar: 'https://i.pravatar.cc/160?img=59' },
      { id: 'sample-204', title: 'Using AI for research and portfolio monitoring', avatar: 'https://i.pravatar.cc/160?img=44' },
    ],
  };
}

const SAMPLES = { 'sample-201': bestPractices };

export const hasSampleConversation = (id) => Object.hasOwn(SAMPLES, String(id));
export const getSampleConversation = (id) => (hasSampleConversation(id) ? SAMPLES[id]() : null);
