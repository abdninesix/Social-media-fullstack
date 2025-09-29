import { prisma } from "@/client";
import Feed from "@/components/Feed";
import FollowButton from "@/components/FollowButton";
import Image from "@/components/Image";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {

  const { userId } = await auth()

  const { username } = await params
  
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: { _count: { select: { followers: true, followings: true } }, followings: userId ? { where: { followerId: userId } } : undefined }
  })

  if (!user) return notFound()

  return (
    <div className="">
      {/* PROFILE TITLE */}
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 bg-[#00000084]">
        <Link href="/">
          <Image path="sm/icons/back.svg" alt="back" w={24} h={24} />
        </Link>
        <h1 className="font-bold text-lg">{user.displayName}</h1>
      </div>
      {/* INFO */}
      <div className="">
        {/* COVER & AVATAR CONTAINER */}
        <div className="relative w-full -z-10">
          {/* COVER */}
          <div className="w-full aspect-[3/1] relative">
            <Image path={user.cover || "sm/general/coverNew.jpeg"} alt="" w={600} h={200} tr={true} />
          </div>
          {/* AVATAR */}
          <div className="w-1/5 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
            <Image path={user.img || "sm/general/avatarNew.png"} alt="" w={100} h={100} tr={true} />
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-2 p-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Image path="sm/icons/more.svg" alt="more" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Image path="sm/icons/explore.svg" alt="more" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Image path="sm/icons/message.svg" alt="more" w={20} h={20} />
          </div>
          {userId && userId !== user.id && <FollowButton userId={user.id} isFollowed={!!user.followings.length} />}
          <FollowButton userId={user.id} isFollowed={!!user.followings.length} />
        </div>
        {/* USER DETAILS */}
        <div className="p-4 flex flex-col gap-2">
          {/* USERNAME & HANDLE */}
          <div className="">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <span className="text-textGray text-sm">@{user.username}</span>
          </div>
          {user.bio && <p>{user.bio}</p>}
          {/* JOB & LOCATION & DATE */}
          <div className="flex gap-4 text-textGray text-[15px]">
            {user.location &&
              <div className="flex items-center gap-2">
                <Image
                  path="sm/icons/userLocation.svg"
                  alt="location"
                  w={20}
                  h={20}
                />
                <span>{user.location}</span>
              </div>}
            <div className="flex items-center gap-2">
              <Image path="sm/icons/date.svg" alt="date" w={20} h={20} />
              <span>Joined {new Date(user.createdAt.toString()).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
            </div>
          </div>
          {/* FOLLOWINGS & FOLLOWERS */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">{user._count.followers}</span>
              <span className="text-textGray text-[15px]">Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{user._count.followings}</span>
              <span className="text-textGray text-[15px]">Followings</span>
            </div>
          </div>
        </div>
      </div>
      {/* FEED */}
      <Feed userProfileId={user.id} />
    </div>
  );
};

export default UserPage;
