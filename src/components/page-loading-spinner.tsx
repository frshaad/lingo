import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex size-full items-center justify-center">
      <Loader className="animate-spin text-muted-foreground" size={32} />
    </div>
  );
}
