import { NextRequest, NextResponse } from "next/server";
import NextCors from 'nextjs-cors';
import redis from "../../../../../lib/redis";
import { generateBotResponse } from "../../../../../prisma/services/reply";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextRequest) {
    
    const body = await req.json();
    console.log(req)
    const { messages } = body;
    const { shopDomain } = body;
    const { conversationId } = body;
    const { timestamp } = body;
    const { userDetails } = body;
    await redis.lpush('create-conv',JSON.stringify({
        shop: shopDomain,
        id: conversationId,
        time: timestamp
    }))

    await redis.lpush('create-mssg',JSON.stringify({
        convId: conversationId,
        timestamp: timestamp,
        sender: "user",
        text: "message"
    }))
    const botResponse = await generateBotResponse(shopDomain,messages);
    // const botResponse = "await generateBotResponse(shopDomain,messages)";

   

}