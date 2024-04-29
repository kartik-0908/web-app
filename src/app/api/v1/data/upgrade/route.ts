import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server";
import { getCurrentPlan, upgradeData } from "../../../../../../prisma/services/user";
import axios from "axios";

async function createAppSubscription(access_token: string, shop: string, dollar: number, plan_name: string) {
  const accessToken = access_token;
  const shopDomain = shop;
  console.log("returbn: " + process.env.NEXT_shopify_upgrade_return)
  console.log("returbn: " + (process.env.NEXT_shopify_upgrade_type))
  const test: string = process.env.NEXT_shopify_upgrade_type || "false";

  try {
    const response = await axios.post(
      `https://${shopDomain}/admin/api/2024-04/graphql.json`,
      {
        query: `
            mutation AppSubscriptionCreate($name: String!,  $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!) {
              appSubscriptionCreate(name: $name,returnUrl: $returnUrl,lineItems: $lineItems) {
                userErrors {
                  field
                  message
                }
                appSubscription {
                  id
                }
                confirmationUrl
              }
            }
          `,
        variables: {
          name: `${plan_name}`,
          // test: Boolean(test),
          returnUrl: `${process.env.NEXT_shopify_upgrade_return}`,
          lineItems: [
            {
              plan: {
                appRecurringPricingDetails: {
                  price: {
                    amount: `${dollar}`,
                    currencyCode: 'USD',
                  },
                  interval: 'EVERY_30_DAYS',
                },
              },
            },
          ],
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
      }
    );

    // console.log(response.data.data.appSubscriptionCreate.confirmationUrl);
    return response.data.data.appSubscriptionCreate.confirmationUrl;
  } catch (error) {
    console.error('Error creating app subscription:', error);
  }
};


export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (session && session.user && session.user.email) {
    const email = session.user.email;
    const updateResult = await upgradeData(email);
    console.log(updateResult)
    const data = await req.json();
    console.log(data);
    const { dollar } = data;
    const { plan_name } = data;
    if (updateResult) {
      const { shop } = updateResult;
      const { accessToken } = updateResult;
      const confirmation_url = await createAppSubscription(accessToken, shop, dollar, plan_name)
      console.log(confirmation_url)
      return NextResponse.json({
        "url": confirmation_url
      })
    }
    return NextResponse.json({
      "data": "hello"
    })
  }
}
export async function GET() {
  const session = await getServerSession();
  if (session && session.user && session.user.email) {
    const email = session.user.email;
    const data = await getCurrentPlan(email);
    console.log(data)
    if(data){
     return NextResponse.json(data)
    }
    return NextResponse.json({
      "hello": "hello"
    })
  }
}