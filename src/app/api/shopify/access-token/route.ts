import axios from 'axios';
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from 'next/server';
import { store_token } from '../../../../../prisma/services/user';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const session = await getServerSession();
  const { shop, code } = body;
  console.log("inside accestoken route")
  console.log("shop: "+ shop)
  console.log("code: "+ code)


  try {
    const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: process.env.shopify_Key,
      client_secret: process.env.shopify_Secret,
      code: code,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log("inside try")
    console.log(response)
    if (session && session.user && session.user.email) {
      console.log("access_token: "+ response.data.access_token)
      await store_token(response.data.access_token, session?.user?.email, shop)
    }
    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve access token' });
  }
}