import { getServerSession } from "next-auth"
import {  NextRequest, NextResponse } from "next/server";
import { getAnalyticsData, getHomeData } from "../../../../../../prisma/services/user";

export async function GET(request: NextRequest) {
    const session = await getServerSession();
    const url = request.nextUrl;
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    if (!startDate || !endDate) {
        return new NextResponse(JSON.stringify({ error: 'Missing startDate or endDate query parameters' }), { status: 400 });
    }
    if (session && session.user && session.user.email) {
        try {
            // Adjust getAnalyticsData to your needs. Ensure it returns a type that matches AnalyticsData.
            const analyticsData = await getAnalyticsData(session.user.email,startDate, endDate);
            console.log(analyticsData)
            return new NextResponse(JSON.stringify({
                data: analyticsData
            }));
        } catch (error) {
            console.error('Error fetching analytics data:', error);
            return new NextResponse(JSON.stringify({ error: 'Failed to fetch analytics data' }), { status: 500 });
        }
    } else {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
  
}