import './globals.css';

import type { Metadata } from 'next';

import { WebVitals } from '@/components/web-vitals';
import { inter } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Next Template',
  description: 'Next.js 15 template created by Farshad Hatami',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
