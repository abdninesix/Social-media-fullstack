"use client"

import { followUser } from '@/action'
import { socket } from '@/socket'
import React, { useEffect, useOptimistic, useState } from 'react'

const FollowButton = ({ userId, username, isFollowed }: { userId: string, username: string, isFollowed: boolean }) => {

    const [state, setState] = useState(isFollowed)

    const followAction = async () => {
        switchOptimisticFollow("");
        await followUser(userId);
        setState(prev => { return !prev });
    }

    const [optimisticFollow, switchOptimisticFollow] = useOptimistic(state, (prev) => { return !prev })

    useEffect(() => {
        if (state) {
            socket.emit("sendNotification", { receiverUsername: username, data: { senderUsername: username, type: "follow", link: `/${username}` } })
        }
    }, [state, username, isFollowed])

    return (
        <form action={followAction}>
            <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
                {optimisticFollow ? "Unfollow" : "Follow"}
            </button>
        </form>
    )
}

export default FollowButton