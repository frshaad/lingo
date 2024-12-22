import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function MarketingHeader() {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
        <Logo />
        <ClerkAuthButtons />
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
      <Image src="/mascot.svg" alt="lingo's mascot" width={40} height={40} />
      <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
        Lingo
      </h1>
    </div>
  );
}

function ClerkAuthButtons() {
  return (
    <>
      <ClerkLoading>
        <Loader size={20} className="animate-spin text-muted-foreground" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton
            mode="modal"
            // fallbackRedirectUrl="/learn"
            // signUpFallbackRedirectUrl="/learn"
          >
            <Button size="lg" variant="ghost">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}
