import { NextResponse } from "next/server";
import { getKbDetails } from "../../../../../../prisma/services/user";
import { auth } from "@/app/auth";

export async function GET() {
    const session = await auth();
    if (session && session.user && session.user.email) {
        try {
            const email = session.user.email;
            const data = await getKbDetails(email)
            return NextResponse.json(data)
        } catch (e) {
            console.log(e)
        }
    }
}









