import Image from 'next/image';
import Link from 'next/link';

import {
  ClerkLoaded,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';

import ClerkLoadingSpinner from '@/components/clerk/clerk-loading';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center gap-2 p-4 max-lg:flex-col">
      <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image src="/hero.svg" alt="hero" fill priority />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="max-w-lg text-center text-xl font-bold text-neutral-600 dark:text-neutral-200 lg:text-3xl">
          Learn, practice and master new languages with Lingo.
        </h1>
        <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
          <ClerkLoadingSpinner />
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" variant="secondary" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="primaryGhost" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">Continue Learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
