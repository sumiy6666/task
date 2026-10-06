import { LegalPage } from '@/components/legal/LegalPage';

export const metadata = {
  title: 'Privacy Policy | AV CIRCLE',
  description: 'How AV COMMUNITY collects, uses, shares and protects your personal information.'
};

const sections = [
  {
    title: 'Information We Collect',
    left: 'We collect information that you provide directly to us, as well as information that is automatically collected when you use our platform.',
    right: 'This may include your name, email address, job title, organisation, profile details, content you share (posts, comments, messages), device information, and usage data (pages visited, features used, interactions).'
  },
  {
    title: 'How We Use Your Information',
    left: 'We use your information to provide and improve the AV Community platform, personalise your experience, facilitate community interactions, send important updates, and ensure the security and integrity of our services.',
    right: 'This includes showing relevant content and topics, enabling discussions, managing events, notifying you about activity and updates, and analysing usage to enhance the community experience.'
  },
  {
    title: 'Sharing Your Information',
    left: {
      lead: 'We do not sell your personal information. We may share your information with:',
      items: [
        'Other community members (based on your public profile)',
        'Service providers who help us operate the platform (e.g. hosting, analytics, email services)',
        'Legal authorities, if required by law',
        'Partners or collaborators for events or initiatives (where applicable)'
      ]
    },
    right: 'We only share the information necessary to provide and improve our services or as required by law, and we take appropriate measures to ensure it is protected.'
  },
  {
    title: 'Your Choices & Controls',
    left: {
      lead: 'You can control your information and privacy settings through your account. You may:',
      items: [
        'Update or edit your profile information',
        'Manage your notification and communication preferences',
        'Control your visibility within the community',
        'Request deletion of your account, subject to legal requirements'
      ]
    },
    right: 'You can also choose what information to share in your posts, discussions and event registrations.'
  },
  {
    title: 'Data Security',
    left: 'We take reasonable technical and organisational measures to protect your information from unauthorised access, disclosure, alteration or destruction.',
    right: 'While we strive to protect your personal information, no system can be 100% secure. We encourage you to also take steps to keep your account and information safe.'
  },
  {
    title: 'Cookies & Tracking',
    left: 'We use cookies and similar technologies to improve your experience, understand how our platform is used, and provide relevant content.',
    right: 'You can manage your cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of the platform.'
  },
  {
    title: 'Your Rights',
    left: 'Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, update or delete your data.',
    right: 'If you would like to exercise any of these rights, please contact us using the details below.'
  }
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={[
        'Your privacy matters to us. This Privacy Policy explains how we collect, use, share and protect your personal information when you use AV COMMUNITY.',
        'We are committed to being transparent about our data practices and giving you control over your information while you participate in our community.'
      ]}
      image="/images/legal/privacy-hero.png"
      sections={sections}
      contact={{
        text: 'If you have any questions, concerns or requests regarding this Privacy Policy or how we handle your information, please reach out to us.',
        email: 'privacy@avcommunity.com',
        note: 'We’ll get back to you as soon as possible.'
      }}
    />
  );
}
