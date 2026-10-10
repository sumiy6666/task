import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SignInCard } from '@/components/compose/SignInCard';
import { ProfilePageView } from '@/components/profile/ProfilePageView';
import { SAMPLE_PROFILE } from '@/components/profile/sampleProfile';
import { getCurrentUser, isDiscourseConfigured } from '@/lib/discourse';
import { loadProfile } from '@/lib/discourse/profile';

export const metadata = { title: 'My Profile | AV Community' };

// The signed-in member's forum profile: details, stats, activity and badges
// here, and their notifications and messages when those tabs are opened.
// Guests are asked to sign in; without the forum the profile is a sample.
export default async function ProfilePage({ searchParams }) {
  const { tab } = await searchParams;
  const user = await getCurrentUser().catch(() => null);
  const overSample = (u) => ({ ...SAMPLE_PROFILE, name: u.name || SAMPLE_PROFILE.name, username: u.username || SAMPLE_PROFILE.username, avatar: u.avatar || SAMPLE_PROFILE.avatar });
  // Without the forum, the demo member's name and photo over the sample profile.
  if (!isDiscourseConfigured()) return <ProfilePageView profile={user ? overSample(user) : SAMPLE_PROFILE} initialTab={tab} />;

  if (!user) {
    return (
      <main className="container min-h-screen">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'My Profile' }]} />
        <SignInCard returnTo={tab ? `/profile?tab=${encodeURIComponent(tab)}` : '/profile'} title="Sign in to see your profile" />
      </main>
    );
  }

  const live = await loadProfile(user.username).catch((error) => {
    console.error('Could not load the profile from Discourse', error);
    return null;
  });
  // If the forum can't be read right now, show who they are over the sample.
  const profile = live?.profile || overSample(user);
  return <ProfilePageView profile={profile} live={live} initialTab={tab} />;
}
