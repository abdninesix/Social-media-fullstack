"use client"

import React, { useEffect, useState } from 'react'
import { Notifications } from './svg'
import { socket } from '@/socket'
import Link from 'next/link'

type NotificationType = {
    id: string,
    senderUsername: string,
    type: "like" | "comment" | "rePost" | "follow",
    link: string,
}

const Notification = () => {

    const [notifications, setNotifications] = useState<NotificationType[]>([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        socket.on("getNotification", (data: NotificationType) => {
            setNotifications((prev) => [...prev, data])
        })
        return () => {
            socket.off("getNotification")
        }
    }, [])

    return (
        <div className='relative'>
            <div className="p-2 rounded-full hover:bg-inputGray text-white flex items-center gap-4 cursor-pointer" onClick={() => setOpen(prev => !prev)}>
                <div className="size-8"><Notifications /></div>
                <span className="hidden xxl:inline">Notifications</span>
            </div>
            {open && (<div className='absolute -right-full p-4 rounded-lg shadow-lg bg-white text-black flex flex-col gap-4 w-max'>
                <h1 className='text-xl text-textGray'>Notifications</h1>
                {notifications.map((n) => (
                    <Link href={n.link} className='cursor-pointer' key={n.id}>
                        <b>{n.senderUsername}</b>
                        {" "}
                        {n.type === "like" ? "liked your post" : n.type === "comment" ? "replied to your post" : n.type === "rePost" ? "repost your post" : "followed you"}
                    </Link>
                ))}
            </div>)}
        </div>
    )
}

export default Notification