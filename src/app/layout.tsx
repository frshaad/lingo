import './globals.css';

import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';
import { WebVitals } from '@/components/web-vitals';
import { inter } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'TechRivive',
  description:
    'TechRevive brings your devices back to life with expert repair services for smartphones, laptops, tablets, and more. From cracked screens to battery replacements, we deliver quick, affordable, and hassle-free solutions. Trust us for quality repairs you can count on!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <WebVitals />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
