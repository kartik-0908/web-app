import {  NextResponse } from "next/server";
import { getAnalyticsData, getCustomizationData, getHomeData } from "../../../../../../prisma/services/user";
import { auth } from "@/app/auth";

export async function GET() {
    const session = await auth();
    if (session && session.user && session.user.email) {
        console.log(session.user?.email)
        const data = await getCustomizationData(session.user?.email)
        // console.log(data)
        return NextResponse.json({
            data
        })
    }
}