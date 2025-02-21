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

export default function AuthButtons() {
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
