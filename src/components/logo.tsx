import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
      <Image src="/mascot.svg" alt="lingo's mascot" width={40} height={40} />
      <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
        Lingo
      </h1>
    </div>
  );
}
