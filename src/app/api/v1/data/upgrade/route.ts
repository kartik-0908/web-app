import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server";
import { upgradeData } from "../../../../../../prisma/services/user";
import axios from "axios";

async function createAppSubscription (access_token: string, shop: string)  {
    const accessToken = access_token;
    const shopDomain = shop;
  
    try {
      const response = await axios.post(
        `https://${shopDomain}/admin/api/2024-04/graphql.json`,
        {
          query: `
            mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!) {
              appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems) {
                userErrors {
                  field
                  message
                }
                appSubscription {
                  id
                  lineItems {
                    id
                    plan {
                      pricingDetails {
                        __typename
                      }
                    }
                  }
                }
                confirmationUrl
              }
            }
          `,
          variables: {
            name: 'Super Duper Recurring and Usage Plan',
            returnUrl: 'http://super-duper.shopifyapps.com/',
            lineItems: [
              {
                plan: {
                  appUsagePricingDetails: {
                    terms: '$1 for 100 emails',
                    cappedAmount: {
                      amount: 20.0,
                      currencyCode: 'USD',
                    },
                  },
                },
              },
              {
                plan: {
                  appRecurringPricingDetails: {
                    price: {
                      amount: 10.0,
                      currencyCode: 'USD',
                    },
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
  
      console.log(response.data);
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
        if (updateResult) {
            const { shop } = updateResult;
            const { accessToken } = updateResult;

            createAppSubscription(accessToken, shop) 
          
            // console.log("after confirmation")
            // console.log(response.data);
        }




        return NextResponse.json({
            "data": "hello"
        })
    }
}