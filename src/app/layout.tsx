import './globals.css';

import type { Metadata } from 'next';

import ClerkAuthProvider from '@/components/clerk-provider';
import { Toaster } from '@/components/ui/sonner';
import { WebVitals } from '@/components/web-vitals';
import { nunito } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Lingo',
  description:
    'Lingo is a language learning platform that helps you learn languages with fun and interactive lessons.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkAuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${nunito.className} antialiased`}>
          <WebVitals />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkAuthProvider>
  );
}
