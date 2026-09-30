This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Discourse backend

The app talks to Discourse only from the server (`src/lib/discourse/`, `src/app/api/`), so the API key never reaches the browser.

1. Copy `.env.example` to `.env.local`.
2. Set `DISCOURSE_URL`, `DISCOURSE_API_KEY` (Admin → API → New API Key, "All users" scope) and `DISCOURSE_API_USERNAME`.
3. Restart `npm run dev`.

Without `DISCOURSE_URL` and `DISCOURSE_API_KEY` the app runs on built-in demo data (`src/lib/discourse/mock.js`), so the UI can be worked on offline.

| Screen | Route | Discourse endpoint |
| --- | --- | --- |
| Start a Conversation (general) | `/conversations/new` → `POST /api/topics` | `POST /posts.json` |
| Start a Conversation (poll) → Review → Post | `/conversations/new?type=poll` → `POST /api/topics` | `POST /posts.json` with `[poll]` markup and the `poll` tag |
| Save draft | `POST /api/drafts` | `POST /drafts.json` |
| Attach image | `POST /api/uploads` | `POST /uploads.json` |
| Individual Conversation | `/conversations/[id]` | `GET /t/{id}.json`, `GET /categories.json` |
| Reply | `POST /api/topics/[id]/replies` | `POST /posts.json` |
| Like | `POST /api/posts/[id]/like` | `POST /post_actions.json`, `DELETE /post_actions/{id}.json` |
| Bookmark | `POST /api/topics/[id]/bookmark` | `POST /bookmarks.json` |
| Vote on a poll | `POST /api/polls/vote` | `PUT /polls/vote.json` |
| Register for event | `POST /api/events/[id]/register` | `POST /discourse-post-event/events/{post_id}/invitees.json` (Calendar plugin) |

Every poll topic is tagged `poll` because Discourse has no poll index endpoint; poll lists (latest, trending, closed) should query `/tag/poll.json`. Tagging must be enabled on the forum and the API user must be allowed to create tags.

Sizes in the new screens are written as `calc(<figma px> * var(--px))`, where `--px` is one pixel of the 1440px Figma frame, so values can be checked directly against the design.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
