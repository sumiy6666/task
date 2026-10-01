import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { SignInNotice } from '@/components/layout/SignInNotice';
import { getCurrentUser, isSignInEnabled } from '@/lib/discourse';
import { Footer } from '@/components/layout/Footer';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
