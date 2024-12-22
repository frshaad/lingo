import MobileHeader from '@/components/mobile-header';
import Sidebar from '@/components/sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full max-lg:pt-12 lg:pl-72">
        <div className="mx-auto h-full max-w-5xl pt-6">{children}</div>
      </main>
    </>
  );
}
