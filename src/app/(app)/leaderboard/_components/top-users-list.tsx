import { Avatar, AvatarImage } from '@/components/ui/avatar';

type Properties = {
  list: {
    userId: string;
    userName: string;
    userImageSrc: string;
    points: number;
  }[];
};

export default function TopTenUsersList({ list }: Properties) {
  return (
    <>
      {list.map((user, index) => (
        <div
          className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50"
          key={user.userId}
        >
          <span className="mr-4 font-bold text-lime-700">{index + 1}</span>
          <Avatar className="ml-3 mr-6 size-12 border bg-green-500">
            <AvatarImage className="object-cover" src={user.userImageSrc} />
          </Avatar>
          <p className="flex-1 font-bold text-neutral-800">{user.userName}</p>
          <p className="text-muted-foreground">{user.points} XP</p>
        </div>
      ))}
    </>
  );
}
