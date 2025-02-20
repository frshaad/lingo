import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function PromotionCard() {
  return (
    <section className="space-y-4 rounded-xl border-2 p-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image alt="" height={26} src="/unlimited.svg" width={26} />
          <h3 className="text-lg font-bold">Upgrade to Pro</h3>
        </div>
        <p className="text-muted-foreground">Get unlimited hearts and more!</p>
      </div>
      <Button className="w-full" size="lg" variant="super" asChild>
        <Link href="/shop">Upgrade today</Link>
      </Button>
    </section>
  );
}
