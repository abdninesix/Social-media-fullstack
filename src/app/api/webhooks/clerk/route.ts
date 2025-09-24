import { prisma } from '@/client'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req)

        // Do something with payload
        // For this guide, log payload to console
        const { id } = evt.data
        const eventType = evt.type
        console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
        console.log('Webhook payload:', evt.data)

        //Our action for database
        if (eventType === "user.created") {
            try {
                const user = evt.data
                await prisma.user.create({
                    data: {
                        id: user.id,
                        username: user.username || "",
                        email: user.email_addresses[0].email_address || "",
                    }
                })
                return new Response('User created', { status: 200 })
            } catch (error) {
                console.log(error)
                return new Response('Error creating the user', { status: 500 })
            }
        }

        if (eventType === "user.deleted") {
            try {
                const user = evt.data
                await prisma.user.delete({where: {id: user.id}})
                return new Response('User deleted', { status: 200 })
            } catch (error) {
                console.log(error)
                return new Response('Error creating the user', { status: 500 })
            }
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}