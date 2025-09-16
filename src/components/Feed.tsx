import { prisma } from "@/client"
import Post from "./Post"
import { auth } from "@clerk/nextjs/server"
import InfiniteFeed from "./InfiniteFeed"

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {

  const { userId } = await auth()
  if (!userId) return

  // Fetch posts from only current user and followings
  const whereCondition = userProfileId ? { userId: userProfileId, parentPostId: null } : {
    parentPostId: null,
    userId: {
      in: [userId, ...(await prisma
        .follow
        .findMany({ where: { followerId: userId }, select: { followingId: true }, }))
        .map((follow) => follow.followingId)]
    }
  }

  const posts = await prisma.post.findMany({ where: whereCondition, take: 3, skip: 0, orderBy: { createdAt: "desc" } })

  return (
    <div>
      {/* This component fetches the first 3 posts on load */}
      {posts.map((post) => (
        <div key={post.id}>
          <Post />
        </div>
      ))}
      {/* This component fetches the next 3 posts on scroll and continues to do so */}
      <InfiniteFeed userProfileId={userProfileId} />
    </div>
  )
}

export default Feed