import Image from 'next/image';

import { Button } from '@/components/ui/button';

function CountryFlag({ lang, src }: { lang: string; src: string }) {
  return (
    <Button className="w-full" size="lg" variant="ghost">
      <Image
        alt={lang}
        className="mr-4 rounded-md capitalize"
        height={32}
        src={src}
        width={40}
      />
      {lang}
    </Button>
  );
}

const COUNTRIES = [
  { id: 1, src: '/de.svg', lang: 'german' },
  { id: 2, src: '/es.svg', lang: 'spanish' },
  { id: 3, src: '/fr.svg', lang: 'french' },
  { id: 4, src: '/it.svg', lang: 'italian' },
  { id: 5, src: '/jp.svg', lang: 'japanese' },
];

export default function MarketingFooter() {
  return (
    <footer className="hidden h-20 w-full border-t-2 border-slate-200 p-2 dark:border-slate-800 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        {COUNTRIES.map((country) => (
          <CountryFlag key={country.id} {...country} />
        ))}
      </div>
    </footer>
  );
}
