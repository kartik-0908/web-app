import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { getStoreData } from "../../../../../../prisma/services/user";

export async function POST() {
    const session = await getServerSession();
    if (session && session.user && session.user.email) {
        const email = session.user.email;
        return NextResponse.json({
            "data": "hello"
        })
    }
}