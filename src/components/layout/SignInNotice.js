'use client';

import { useSearchParams } from 'next/navigation';

const MESSAGES = {
  expired: 'Sign-in took too long or was started in another tab. Please try again.',
  failed: 'Sign-in with AV Community did not complete. Please try again.',
};

// Shown after /api/auth/callback redirects back with ?signin=<reason>.
export function SignInNotice() {
  const reason = useSearchParams().get('signin');
  if (!MESSAGES[reason]) return null;
  return (
    <div className="container" role="alert">
      <p style={{ background: '#fff4e5', color: '#8a4b00', borderRadius: 10, padding: '10px 16px', fontSize: 14, margin: '4px 0 8px' }}>
        {MESSAGES[reason]}
      </p>
    </div>
  );
}
