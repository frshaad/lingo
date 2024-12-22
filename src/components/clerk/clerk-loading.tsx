import { ClerkLoading } from '@clerk/nextjs';
import { Loader } from 'lucide-react';

export default function ClerkLoadingSpinner() {
  return (
    <ClerkLoading>
      <Loader size={20} className="animate-spin text-muted-foreground" />
    </ClerkLoading>
  );
}
