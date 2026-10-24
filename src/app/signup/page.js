import { permanentRedirect } from 'next/navigation';

// "Request to join" moved to /join; old links still land there.
export default function SignUpPage() {
  permanentRedirect('/join');
}
