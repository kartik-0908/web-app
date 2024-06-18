// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";
// import { auth } from "@/app/auth";
// import { cancelData } from "../../../../../../lib/services/user";


// async function cancelAppSubscription(access_token: string, subscriptionId: string, shop:string) {
//   const accessToken = access_token;
//   const query = `
//     mutation AppSubscriptionCancel($id: ID!, $prorate: Boolean) {
//       appSubscriptionCancel(id: $id, prorate: $prorate) {
//         userErrors {
//           field
//           message
//         }
//         appSubscription {
//           id
//           status
//         }
//       }
//     }
//   `;
//   const variables = {
//     id: subscriptionId,
//   };
//   try {
//     const response = await axios.post(
//       `https://${shop}/admin/api/2024-04/graphql.json`,
//       { query, variables },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Shopify-Access-Token': accessToken,
//         },
//       }
//     );
//     // if(response.data.appSubscriptionCancel.appSubscription.status === "CANCELLED"){
//     //   await updatePlanDetails(shop);
//     // }

//     console.log('Response:', response.data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };


// export async function POST() {
//   const session = await auth();
//   if (session && session.user && session.user.email) {
//     const email = session.user.email;
//     const updateResult = await cancelData(email);
//     console.log(updateResult)
//     if (updateResult) {
//       const { shop } = updateResult;
//       const { accessToken } = updateResult;
//       const {id} = updateResult;
//       const confirmation_url = await cancelAppSubscription(accessToken, id,shop)

//       console.log(confirmation_url)
//       return NextResponse.json({
//         "url": confirmation_url
//       })
//     }
//     return NextResponse.json({
//       "data": "hello"
//     })
//   }
// }
