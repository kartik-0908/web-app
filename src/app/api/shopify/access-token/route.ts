import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
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
    console.log(response.data.access_token)

    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve access token' });
  }
}