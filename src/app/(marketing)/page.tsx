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

function AuthButtons() {
  return (
    <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
      <ClerkLoadingSpinner />
      <ClerkLoaded>
        <SignedOut>
          <SignUpButton mode="modal">
            <Button className="w-full" size="lg" variant="secondary">
              Get Started
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button className="w-full" size="lg" variant="primaryGhost">
              I already have an account
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Button className="w-full" size="lg" variant="secondary" asChild>
            <Link href="/learn">Continue Learning</Link>
          </Button>
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center gap-2 p-4 max-lg:flex-col">
      <div className="relative mb-8 size-[240px] lg:mb-0 lg:size-[424px]">
        <Image alt="hero" src="/hero.svg" fill priority />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="max-w-lg text-center text-xl font-bold text-neutral-600 dark:text-neutral-200 lg:text-3xl">
          Learn, practice and master new languages with Lingo.
        </h1>
        <AuthButtons />
      </div>
    </div>
  );
}
