import { LegalPage } from '@/components/legal/LegalPage';

export const metadata = {
  title: 'Terms of Use | AV CIRCLE',
  description: 'The rules for accessing and using the AV COMMUNITY platform.'
};

const sections = [
  {
    title: 'Using AV COMMUNITY',
    left: 'AV COMMUNITY is a professional space for connecting, sharing knowledge and exchanging ideas around family office accounting, operations, investments, technology and related topics.',
    right: {
      lead: 'When using the platform, please:',
      items: [
        'Provide accurate information',
        'Keep your account details secure',
        'Use the platform responsibly and respectfully',
        'Follow our Community Guidelines',
        'Respect the privacy and intellectual property of others',
        'Use the platform only for lawful purposes'
      ]
    }
  },
  {
    title: 'Your Account',
    left: 'Some features require you to create an account. You are responsible for maintaining the confidentiality of your account and for all activity that occurs under it.',
    right: {
      lead: 'You agree to:',
      items: [
        'Provide accurate and up-to-date information',
        'Keep your account credentials confidential',
        'Inform us if you believe your account has been compromised',
        'We may restrict or suspend accounts that violate these Terms or applicable laws'
      ]
    }
  },
  {
    title: 'Community Content',
    left: 'AV COMMUNITY allows members to create and share content, including discussions, articles, polls, events and other resources. You remain responsible for the content you contribute.',
    right: {
      lead: 'By posting content, you confirm that:',
      items: [
        'You have the necessary rights to share it',
        'It does not violate the rights of others',
        'You understand that content may be visible to other members based on your privacy settings'
      ]
    }
  },
  {
    title: 'Respectful Participation',
    left: 'We want AV COMMUNITY to remain a useful and constructive professional space. Please be respectful, open-minded and considerate in your interactions.',
    right: {
      lead: 'You must not:',
      items: [
        'Harass, threaten or intimidate others',
        'Share abusive, hateful or discriminatory content',
        'Impersonate another person or organisation',
        'Publish misleading or deceptive information',
        'Share private or confidential information without permission',
        'Spam or use the platform for unauthorised solicitation',
        'Upload malicious software or harmful content'
      ]
    }
  },
  {
    title: 'Intellectual Property',
    left: 'AV COMMUNITY and its design, branding, software and original content are protected by applicable intellectual property laws.',
    right: 'You may use community content for personal or professional reference. You may not copy, reproduce, distribute, modify or commercially exploit any AV COMMUNITY materials without appropriate permission.'
  },
  {
    title: 'Third-Party Links & Content',
    left: 'The platform may contain links or content provided by third parties for your convenience and information.',
    right: 'AV COMMUNITY does not endorse or control third-party websites, products or services. You are responsible for reviewing their terms and privacy practices.'
  },
  {
    title: 'Events, Polls & Community Activities',
    left: 'AV COMMUNITY may offer events, webinars, roundtables, polls and other community activities.',
    right: 'Event information, schedules and availability may change. Registration does not guarantee participation where capacity is limited. Poll results and community discussions represent the views of individual participants and should not be treated as professional advice.'
  },
  {
    title: 'Professional Information & Advice',
    left: 'Content on AV COMMUNITY is intended for general informational and educational purposes only.',
    right: 'It should not be considered a substitute for professional financial, legal, tax, accounting or investment advice. Please seek appropriate professional advice before making decisions based on community content.'
  },
  {
    title: 'Availability & Changes',
    left: 'We aim to keep AV COMMUNITY available and functioning reliably, but we cannot guarantee that the platform will always be uninterrupted, secure or error-free.',
    right: 'We may update, modify, suspend or discontinue features from time to time. We may also update these Terms of Use when necessary. The latest version will be published on this page.'
  },
  {
    title: 'Account Suspension or Termination',
    left: 'We may suspend or terminate access to an account if we reasonably believe that it has violated these Terms, our Community Guidelines or applicable laws.',
    right: 'You may also choose to stop using the platform or request account closure, subject to applicable requirements.'
  },
  {
    title: 'Limitation of Liability',
    left: 'To the extent permitted by law, AV COMMUNITY will not be responsible for losses arising from your reliance on community content, third-party services or temporary interruptions to the platform.',
    right: 'Nothing in these Terms limits rights or protections that cannot legally be excluded.'
  }
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro={[
        'Welcome to AV COMMUNITY. These Terms of Use explain the rules for accessing and using the AV COMMUNITY platform, including discussions, articles, events, polls, resources and other community features.',
        'By accessing or using AV COMMUNITY, you agree to these Terms of Use. If you do not agree with these terms, please do not use the platform.'
      ]}
      updated="1 September 2026"
      image="/images/legal/terms-hero.png"
      sections={sections}
      contact={{
        text: 'If you have any questions about these Terms of Use, please reach out to us.',
        email: 'legal@avcommunity.com',
        note: 'We’ll be happy to help with your questions.'
      }}
    />
  );
}
