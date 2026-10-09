import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { SignInNotice } from '@/components/layout/SignInNotice';
import { getCurrentUser, isSignInEnabled } from '@/lib/discourse';
import { Footer } from '@/components/layout/Footer';
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

// The site font is Avenir (see globals.css). Avenir is a paid font that is
// not on Windows or Android, so Nunito Sans, the closest free match, stands
// in until Avenir is installed or its files are added to public/fonts/avenir.
const avenirStandIn = Nunito_Sans({
  variable: "--font-avenir-stand-in",
  subsets: ["latin"],
});

export const metadata = {
  title: "AV COMMUNITY",
  description: "Connect, learn and grow with professionals around the world.",
};

export default async function RootLayout({ children }) {
  // A Discourse outage should not take the whole site down with it.
  const user = await getCurrentUser().catch((error) => {
    console.error('Could not load the signed-in member', error);
    return null;
  });

  return (
    <html lang="en" className={avenirStandIn.variable}>
      <body>
        <Header user={user} canSignIn={isSignInEnabled()} />
        <Suspense fallback={null}>
          <SignInNotice />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
