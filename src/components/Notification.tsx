"use client"

import React, { useEffect, useState } from 'react'
import { Notifications } from './svg'
import { socket } from '@/socket'
import { useRouter } from 'next/navigation'

type NotificationType = {
    id: string,
    senderUsername: string,
    type: "like" | "comment" | "rePost" | "follow",
    link: string,
}

const Notification = () => {

    const router = useRouter();

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

    const reset = () => {
        setNotifications([])
    }

    const handleClick = (notification : NotificationType) => {
        setOpen(prev => !prev)
        router.push(notification.link)
    }

    return (
        <div className='relative'>
            <div className="p-2 rounded-full hover:bg-inputGray text-white flex items-center gap-4 cursor-pointer" onClick={() => setOpen(prev => !prev)}>
                <div className="size-8 relative">
                    <Notifications />
                    {notifications.length > 0 && <div className='absolute -right-3 -top-3 bg-iconBlue rounded-full size-6 p-1 text-sm flex items-center justify-center'>{notifications.length}</div>}
                </div>
                <span className="hidden xxl:inline">Notifications</span>
            </div>
            {open && (<div className='absolute left-full top-1/2 p-4 rounded-lg rounded-tl-none shadow-lg bg-white text-black flex flex-col gap-4 w-max'>
                <h1 className='text-xl text-textGray'>Notifications</h1>
                {notifications.map((n) => (
                    <div className='cursor-pointer hover:text-iconBlue' key={n.id} onClick={() => handleClick(n)}>
                        <b>{n.senderUsername}</b>
                        {" "}
                        {n.type === "like" ? "liked your post" : n.type === "comment" ? "replied to your post" : n.type === "rePost" ? "reposted your post" : "followed you"}
                    </div>
                ))}
                <span onClick={(reset)} className={`text-center p-2 rounded-md ${notifications.length > 0 ? "bg-black text-sm text-textGrayLight cursor-pointer" : "text-base text-iconBlue"}`}>{notifications.length === 0 ? "You're all caught up!" : "Mark as read"}</span>
            </div>)}
        </div>
    )
}

export default Notification