import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server";
import { getChatsData, getHomeData } from "../../../../../../prisma/services/user";

export async function GET(req: NextRequest) {
    const session = await getServerSession();
    if (session && session.user && session.user.email) {
        const url = req.nextUrl;
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = parseInt(url.searchParams.get("limit") || "10", 10);
        const data = await getChatsData(session.user.email, page, limit);
        console.log(data)
        return NextResponse.json({
            data
        })
    }
}