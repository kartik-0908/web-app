import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { getProfileData } from "../../../../../../prisma/services/user";

export async function GET() {
    const session = await getServerSession();
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