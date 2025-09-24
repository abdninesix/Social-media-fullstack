"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "./client"

export const likePost = async (postId: number) => {

    const { userId } = await auth()
    if (!userId) return

    const existingLike= await prisma.like.findFirst({
        where: { postId: postId, userId: userId }
    })
    if(existingLike){
        await prisma.like.delete({ where: { id: existingLike.id } })
    }else{
        await prisma.like.create({
            data: { userId, postId }
        })
    }
}