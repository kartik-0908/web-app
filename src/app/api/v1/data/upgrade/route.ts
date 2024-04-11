import { getServerSession } from "next-auth"
import {  NextRequest, NextResponse } from "next/server";
import { upgradeData } from "../../../../../../prisma/services/user";

export async function POST(req : NextRequest) {
    const session = await getServerSession();
    if (session && session.user && session.user.email) {
        const email = session.user.email;
        const updateResult = await upgradeData(email);
        console.log(updateResult)
        return NextResponse.json({
            "data":"hello"
        })
    }
}