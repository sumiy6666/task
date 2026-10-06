import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PageHero } from '@/components/ui/PageHero';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';
import styles from '@/components/feedback/Feedback.module.css';

export const metadata = {
  title: 'Site Feedback | AV CIRCLE',
  description: 'Tell us what is working well, what can be improved, or share new ideas.'
};

export default function FeedbackPage() {
  return (
    <div className={`container min-h-screen ${styles.page}`}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Site Feedback' }]} />

      <PageHero
        compact
        framed
        image="/images/feedback-banner.png"
        label="HELP US IMPROVE"
        title="Share Your Feedback"
        text="Your feedback helps us make AV COMMUNITY a better, more valuable space for everyone. Let us know what’s working well, what can be improved or share new ideas."
      />

      <FeedbackForm />
    </div>
  );
}
