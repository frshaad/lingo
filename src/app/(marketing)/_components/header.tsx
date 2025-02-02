import {
  ClerkLoaded,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

import ClerkLoadingSpinner from '@/components/clerk/clerk-loading';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function MarketingHeader() {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4 dark:border-slate-800">
      <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
        <Logo />
        <ClerkAuthButtons />
      </div>
    </header>
  );
}

function ClerkAuthButtons() {
  return (
    <>
      <ClerkLoadingSpinner />
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button size="lg" variant="ghost">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}
