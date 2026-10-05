import PollPageView from '@/components/poll/PollPageView';
import { loadPolls } from '@/lib/discourse/lists';

export const metadata = { title: 'Polls | AV Community' };

// Real polls from the forum's Polls category; sample polls when Discourse is not connected.
export default async function PollPage() {
  const live = await loadPolls();
  if (!live || (live.open.length === 0 && live.closed.length === 0)) return <PollPageView />;
  return <PollPageView recentPolls={live.open} closedPolls={live.closed} />;
}
