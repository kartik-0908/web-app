import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { saveWebhookDetails, store_token } from '../../../../../prisma/services/user';

const webhookurl = "https://my-app.kartikagarwal0908.workers.dev/webhooks/"

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { shop, code } = body;
  console.log("inside accestoken route")
  console.log("shop: " + shop)
  console.log("code: " + code)
  console.log(process.env.shopify_Secret)

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
    // console.log(response)
    console.log("access_token: " + response.data.access_token)
    const accessToken = response.data.access_token
    console.log("starting storing token")
    await store_token(accessToken, shop)
    await subscribeToWebhooks(shop, accessToken);
    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve access token' });
  }
}

async function subscribeToWebhooks(shop: string, accessToken: string) {
  const webhooks = [
    {
      address: `${webhookurl}app/uninstalled`,
      topic: 'app/uninstalled',
      format: 'json',
    },
    {
      address: `${webhookurl}app_subscriptions/update`,
      topic: 'app_subscriptions/update',
      format: 'json',
    },
    {
      address: `${webhookurl}products/create`,
      topic: 'products/create',
      format: 'json',
    },
    {
      address: `${webhookurl}products/delete`,
      topic: 'products/delete',
      format: 'json',
    },
    {
      address: `${webhookurl}products/update`,
      topic: 'products/update',
      format: 'json',
    },

  ];

  for (const webhookData of webhooks) {
    try {
      await createWebhook(shop, accessToken, webhookData);
      await delay(1000); // Delay for 1 second (1000 milliseconds)
    } catch (error) {
      console.error('Error creating webhook:', error);
    }
  }

  console.log('All webhooks subscribed successfully');
}

async function createWebhook(shop: any, accessToken: any, webhookData: any) {
  try {
    const response = await axios.post(
      `https://${shop}/admin/api/2024-01/webhooks.json`,
      { webhook: webhookData },
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Webhook created:', response.data);
    await saveWebhookDetails(response.data, shop)
    // Handle the successful webhook creation
  } catch (error) {
    console.error('Error creating webhook:');
    // Handle the error
  }
}

function delay(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
