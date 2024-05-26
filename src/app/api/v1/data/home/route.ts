import { NextResponse } from "next/server";
import { getHomeData } from "../../../../../../prisma/services/user";
import { auth } from "@/app/auth";

export async function GET() {
    console.log("hi inside route")
    const session = await auth();
    console.log("hi inside route")
    if (session && session.user && session.user.email) {
        console.log("hi inside route")
        console.log(session.user?.email)
        const data = await getHomeData(session.user?.email)
        // console.log(data)
        return NextResponse.json({
            data
        })
    }
}