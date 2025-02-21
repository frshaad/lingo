import { Skeleton } from '@/components/ui/skeleton';

function UserItem() {
  return (
    <div className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50">
      <Skeleton className="mr-4 h-6 w-[9.6px]" />
      <Skeleton className="ml-3 mr-6 size-12 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="h-6 w-[34px]" />
    </div>
  );
}

export default function TopTenUsersListSkeleton() {
  return (
    <>
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
    </>
  );
}
