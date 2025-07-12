import { prisma } from "@/client"
import Post from "./Post"
import { auth } from "@clerk/nextjs/server"

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

  const posts = await prisma.post.findMany({ where: whereCondition })

  return (
    <div className=''>
      {posts.map((post) => (
        <div key={post.id}>
          <Post />
        </div>
      ))}
    </div>
  )
}

export default Feed