import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { getKbDetails } from "../../../../../../lib/services/user";

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









