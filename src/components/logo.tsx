import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center gap-x-3 pt-8 pb-7 pl-4">
      <Image
        src="/mascot.svg"
        alt="lingo's mascot"
        width={40}
        height={40}
        priority
      />
      <h1 className="font-extrabold text-2xl text-green-600 tracking-wide">
        Lingo
      </h1>
    </div>
  );
}
