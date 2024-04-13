import axios from 'axios';
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from 'next/server';
import { store_token } from '../../../../../prisma/services/user';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const session = await getServerSession();
  const { shop, code } = body;

  try {
    const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: process.env.NEXT_PUBLIC_shopify_Key,
      client_secret: process.env.NEXT_PUBLIC_shopify_Secret,
      code: code,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (session && session.user && session.user.email) {
      console.log("access_token: "+ response.data.access_token)
      await store_token(response.data.access_token, session?.user?.email, shop)
    }
    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve access token' });
  }
}