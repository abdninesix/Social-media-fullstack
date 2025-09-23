"use client"

import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from './Post'

const fetchPosts = async (pageParam: number, userProfileId?: string) => {
    const res = await fetch("http://localhost:3000/api/posts?cursor=" + pageParam + "&user=" + userProfileId)
    return res.json()
}

const InfiniteFeed = ({ userProfileId }: { userProfileId?: string }) => {

    const { data, error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 2 }) => fetchPosts(pageParam, userProfileId),
        initialPageParam: 2,
        getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 2 : undefined
    })

    if (error) return <p className='p-4 text-center'>Something went wrong</p>
    if (status === "pending") return <p className='p-4 text-center'>Loading</p>

    const allPosts = data?.pages?.flatMap(page => page.posts) || []

    return (
        <InfiniteScroll dataLength={allPosts.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={<p className='p-4 text-center'>Posts are loading</p>} endMessage={<p className='p-4 text-center'>No more posts</p>}>
            {allPosts.map((post) => (<Post key={post.id} post={post} />))}
        </InfiniteScroll>
    )
}

export default InfiniteFeed