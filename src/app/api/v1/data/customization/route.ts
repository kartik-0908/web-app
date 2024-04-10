import { getServerSession } from "next-auth"
import {  NextResponse } from "next/server";
import { getAnalyticsData, getCustomizationData, getHomeData } from "../../../../../../prisma/services/user";

export async function GET() {
    const session = await getServerSession();
    if (session && session.user && session.user.email) {
        console.log(session.user?.email)
        const data = await getCustomizationData(session.user?.email)
        // console.log(data)
        return NextResponse.json({
            data
        })
    }
}