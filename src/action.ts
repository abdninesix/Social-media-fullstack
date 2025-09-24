"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "./client"

export const likePost = async (postId: number) => {

    const { userId } = await auth()
    if (!userId) return

    const existingLike = await prisma.like.findFirst({
        where: { postId: postId, userId: userId }
    })
    if (existingLike) {
        await prisma.like.delete({ where: { id: existingLike.id } })
    } else {
        await prisma.like.create({
            data: { userId, postId }
        })
    }
}

export const rePost = async (postId: number) => {

    const { userId } = await auth()
    if (!userId) return

    const existingRePost = await prisma.post.findFirst({
        where: { rePostId: postId, userId: userId }
    })
    if (existingRePost) {
        await prisma.post.delete({ where: { id: existingRePost.id } })
    } else {
        await prisma.post.create({
            data: { userId, rePostId: postId }
        })
    }
}

export const savePost = async (postId: number) => {

    const { userId } = await auth()
    if (!userId) return

    const existingSave = await prisma.savedPosts.findFirst({
        where: { postId: postId, userId: userId }
    })
    if (existingSave) {
        await prisma.savedPosts.delete({ where: { id: existingSave.id } })
    } else {
        await prisma.savedPosts.create({
            data: { userId, postId }
        })
    }
}

export const addComment = async (prevState: { success: boolean, error: boolean }, formData: FormData) => {
    const { userId } = await auth();
    if (!userId) return { success: false, error: true }

    const postId = formData.get("postId")
    const desc = formData.get("desc")
}