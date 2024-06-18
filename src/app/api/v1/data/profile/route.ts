import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { getProfileData } from "../../../../../../lib/services/user";

export async function GET() {
    const session = await auth();
    if (session && session.user && session.user.email) {
        try {
            const shop = await getProfileData(session.user.email);
            return NextResponse.json({
                email: session.user.email,
                shop: shop
            })
        } catch (error) {
            console.error('Error fetching analytics data:', error);
            return new NextResponse(JSON.stringify({ error: 'Failed to fetch analytics data' }), { status: 500 });
        }
    } else {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

}