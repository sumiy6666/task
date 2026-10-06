import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { SignInNotice } from '@/components/layout/SignInNotice';
import { getCurrentUser, isSignInEnabled } from '@/lib/discourse';
import { Footer } from '@/components/layout/Footer';
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

// The site font is Avenir (see --font-sans in globals.css). Avenir is a paid
// font that ships with macOS but not Windows or Android, so Nunito Sans, a
// close free match, stands in where Avenir is not installed.
const avenirFallback = Nunito_Sans({
  variable: "--font-avenir-fallback",
  subsets: ["latin"],
});

export const metadata = {
  title: "AV CIRCLE",
  description: "Connect, learn and grow with professionals around the world.",
};

export default async function RootLayout({ children }) {
  // A Discourse outage should not take the whole site down with it.
  const user = await getCurrentUser().catch((error) => {
    console.error('Could not load the signed-in member', error);
    return null;
  });

  return (
    <html lang="en" className={avenirFallback.variable}>
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
