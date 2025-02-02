import { ClerkLoading } from '@clerk/nextjs';
import { Loader } from 'lucide-react';

export default function ClerkLoadingSpinner() {
  return (
    <ClerkLoading>
      <Loader className="animate-spin text-muted-foreground" size={20} />
    </ClerkLoading>
  );
}
