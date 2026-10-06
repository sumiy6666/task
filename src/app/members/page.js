import MembersPageView from '@/components/members/MembersPageView';
import { loadMembers } from '@/lib/discourse/lists';

export const metadata = { title: 'Member Directory | AV Community' };

// Forum members when Discourse is connected; sample members otherwise.
export default async function MembersPage() {
  const live = await loadMembers();
  return live?.length ? <MembersPageView members={live} /> : <MembersPageView />;
}
