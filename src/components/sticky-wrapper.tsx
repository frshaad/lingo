export default function StickyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="sticky bottom-6 w-80 self-end max-lg:hidden">
      <div className="sticky top-6 flex min-h-[calc(100vh-48px)] flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
}
