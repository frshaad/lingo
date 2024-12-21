import { Clock, MapPinned, Phone } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center">
      <Card className="w-11/12 max-w-sm">
        <CardHeader>
          <CardTitle>Dan&apos;s Computer</CardTitle>
          <CardDescription>Repair Shop</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" asChild>
            <Link href="/" className="flex w-full items-center gap-4 text-sm">
              <MapPinned size={14} />
              <address className="not-italic">
                520 N Tryon St, Charlotte, NC
              </address>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="flex w-full items-center gap-4 text-sm"
          >
            <Clock size={14} />
            <p>
              Open Daily: <span className="font-bold">9 AM - 5 PM</span>
            </p>
          </Button>
        </CardContent>
        <CardFooter>
          <Button variant="default" className="w-full" asChild>
            <Link href="tel:5555555555" className="flex items-center gap-2">
              <Phone />
              021-12345678
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
