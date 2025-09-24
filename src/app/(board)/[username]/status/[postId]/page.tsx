import { prisma } from "@/client";
import Comments from "@/components/Comments";
import Image from "@/components/Image";
import Post from "@/components/Post";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

const StatusPage = async ({ params }: { params: Promise<{ username: string, postId: string }> }) => {

  const { userId } = await auth();
  if (!userId) return;

  const postId = (await params).postId
  const post = await prisma.post.findFirst({
    where: { id: Number(postId) },
    include: {
      user: { select: { displayName: true, username: true, img: true } },
      _count: { select: { likes: true, rePosts: true, comments: true } },
      likes: { where: { userId }, select: { id: true } },
      rePosts: { where: { userId }, select: { id: true } },
      saves: { where: { userId }, select: { id: true } },
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { displayName: true, username: true, img: true } },
          _count: { select: { likes: true, rePosts: true, comments: true } },
          likes: { where: { userId }, select: { id: true } },
          rePosts: { where: { userId }, select: { id: true } },
          saves: { where: { userId }, select: { id: true } },
        },
      }
    },
  })
  if (!post) return notFound()

  return (
    <div>
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10">
        <Link href="/">
          <Image path="sm/icons/back.svg" alt="back" w={24} h={24} />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post type="status" post={post} />
      <Comments comments={post.comments} postId={post.id} username={post.user.username} />
    </div>
  );
};

export default StatusPage;
