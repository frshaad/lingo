import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="flex size-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Not Found 🚧</CardTitle>
          <CardDescription>Could not find requested resource</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
