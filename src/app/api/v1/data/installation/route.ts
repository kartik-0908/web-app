import {  NextResponse } from "next/server";
import { getHomeData, getInstallationData } from "../../../../../../prisma/services/user";
import { auth } from "@/app/auth";

export async function GET() {
    const session = await auth();
    if (session && session.user && session.user.email) {
        console.log(session.user?.email)
        const data = await getInstallationData(session.user?.email)
        return NextResponse.json({
            data
        })
    }
}