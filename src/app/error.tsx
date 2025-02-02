'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex size-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Error ❌</CardTitle>
          <CardDescription>Something went wrong!</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={() => reset()}>
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
