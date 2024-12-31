import Image from 'next/image';

type Props = {
  question: string;
};

export default function QuestionBubble({ question }: Props) {
  return (
    <div className="mb-6 flex items-center gap-x-4">
      <Image
        src="/mascot.svg"
        alt="mascot"
        width={60}
        height={60}
        className="max-lg:hidden"
      />
      <Image
        src="/mascot.svg"
        alt="mascot"
        width={40}
        height={40}
        className="lg:hidden"
      />
      <div className="relative rounded-xl border-2 px-4 py-2 text-sm lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 size-0 -translate-y-1/2 rotate-90 transform border-x-8 border-t-8 border-x-transparent" />
      </div>
    </div>
  );
}
