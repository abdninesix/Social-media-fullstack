import { prisma } from "@/client"
import { auth } from "@clerk/nextjs/server"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const userProfileId = searchParams.get("user")

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

    return Response.json(posts);
}