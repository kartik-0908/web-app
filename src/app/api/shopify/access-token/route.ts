// import axios from 'axios';
// import { NextRequest, NextResponse } from 'next/server';
// import { getStoreData, initializePlan, store_token } from '../../../../../lib/services/user';



// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const { shop, code } = body;
//   console.log("inside accestoken route")
//   console.log("shop: " + shop)
//   console.log("code: " + code)
//   console.log(process.env.shopify_Secret)

//   try {
//     const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
//       client_id: process.env.shopify_Key,
//       client_secret: process.env.shopify_Secret,
//       code: code,
//     }, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });
//     console.log("inside try")
//     // console.log(response)
//     console.log("access_token: " + response.data.access_token)
//     const accessToken = response.data.access_token
//     console.log("starting storing token")
    // await store_token(accessToken, shop)
//     await initializePlan(shop);
//     await getStoreData(shop, accessToken)
//     await subscribeToWebhooks(shop, accessToken);
//     return NextResponse.json({ status: true });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to retrieve access token' });
//   }
// }

// async function subscribeToWebhooks(shop: string, accessToken: string) {
  
//   await redis.lpush('subs-webhook', JSON.stringify({
//     shop: shop,
//     accessToken: accessToken
//   }))
//   console.log('Pushed to queue for webhooks subscription');
// }

