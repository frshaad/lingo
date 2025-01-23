import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function MarketingFooter() {
  return (
    <footer className="hidden h-20 w-full border-slate-200 border-t-2 p-2 lg:block dark:border-slate-800">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        {COUNTRIES.map((country) => (
          <CountryFlag key={country.id} {...country} />
        ))}
      </div>
    </footer>
  );
}

function CountryFlag({ lang, src }: { lang: string; src: string }) {
  return (
    <Button size="lg" variant="ghost" className="w-full">
      <Image
        src={src}
        alt={lang}
        height={32}
        width={40}
        className="mr-4 rounded-md capitalize"
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
