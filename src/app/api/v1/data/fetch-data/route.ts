import { getServerSession } from "next-auth"
import {  NextRequest, NextResponse } from "next/server";
import { getStoreData } from "../../../../../../prisma/services/user";

export async function POST() {
    const session = await getServerSession();
    if (session && session.user && session.user.email) {
        const email = session.user.email;
        const updateResult = await getStoreData(email);
        console.log(updateResult)
        return NextResponse.json({
            "data":"hello"
        })
    }
}