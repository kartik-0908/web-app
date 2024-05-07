import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { getKbDetails } from "../../../../../../prisma/services/user";

export async function GET() {
    const session = await getServerSession();
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









