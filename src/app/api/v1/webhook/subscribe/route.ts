import { getTokenwithShop, saveWebhookDetails } from "../../../../../../prisma/services/user";
import { NextResponse } from "next/server";
import axios from 'axios';
import { auth } from "@/app/auth";

const webhookurl = "https://my-app.kartikagarwal0908.workers.dev/webhooks/"


export async function POST() {
  const session = await auth();
  if (session && session.user && session.user.email) {
    const data = await getTokenwithShop(session.user.email)
    console.log(data);
    const { shop }: any = data;
    const { accessToken }: any = data;

    await deleteAllWebhooks(accessToken, shop)


    return NextResponse.json({
      "sucess": "successfull"
    })
  }
}


async function deleteAllWebhooks(accessToken: string, shopDomain: string): Promise<void> {
  try {
    // Get the list of all webhook subscriptions
    const response = await axios.get<{ webhooks: any}>(
      `https://${shopDomain}/admin/api/2024-01/webhooks.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
        },
      }
    );

    const webhooks = response.data.webhooks;
    console.log(webhooks);

    // Delete each webhook subscription with a delay of one second
    for (const webhook of webhooks) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay of one second

      await axios.delete(
        `https://${shopDomain}/admin/api/2024-01/webhooks/${webhook.id}.json`,
        {
          headers: {
            'X-Shopify-Access-Token': accessToken,
          },
        }
      );

      console.log(`Deleted webhook with ID: ${webhook.id}`);
    }

    console.log('All webhook subscriptions deleted successfully.');
  } catch (error) {
    console.error('Error deleting webhook subscriptions:', error);
  }
}
