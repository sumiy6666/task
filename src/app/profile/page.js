import { ProfilePageView } from '@/components/profile/ProfilePageView';
import { SAMPLE_PROFILE } from '@/components/profile/sampleProfile';
import { getCurrentUser } from '@/lib/discourse';

export const metadata = { title: 'My Profile | AV Community' };

// The signed-in member's name and photo over the sample profile details;
// the rest of the profile is sample content until the forum supplies it.
export default async function ProfilePage({ searchParams }) {
  const { tab } = await searchParams;
  const user = await getCurrentUser().catch(() => null);
  const profile = user
    ? { ...SAMPLE_PROFILE, name: user.name || SAMPLE_PROFILE.name, username: user.username || SAMPLE_PROFILE.username, avatar: user.avatar || SAMPLE_PROFILE.avatar }
    : SAMPLE_PROFILE;

  return <ProfilePageView profile={profile} initialTab={tab} />;
}
