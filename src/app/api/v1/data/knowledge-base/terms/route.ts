// import { NextResponse } from "next/server";
// import redis from "../../../../../../../lib/redis";
// import { auth } from "@/app/auth";
// import { addTermsAndConditionsUrl, deleteTermsAndConditionsUrl, getShop } from "../../../../../../../lib/services/user";

// export async function POST(request: Request) {
//   const session = await auth();

//   if (session && session.user && session.user.email) {
//     const email = session.user.email;
//     const { termsurl } = await request.json();

//     try {
//       await addTermsAndConditionsUrl(email, termsurl);
//       const shop = await getShop(email)
//       const res = await redis.lpush('fetch-links', JSON.stringify({ id: 1, shop: shop, url: termsurl, type: "update" }));

//       return NextResponse.json({ message: "terms added successfully" });
//     } catch (error) {
//       console.error("Error adding FAQ URL:", error);
//       return NextResponse.json({ error: "Failed to add terms URL" }, { status: 500 });
//     }
//   } else {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
// }

// export async function DELETE(request: Request) {
//   const session = await auth();

//   if (session && session.user && session.user.email) {
//     const email = session.user.email;

//     try {
//       const link = await deleteTermsAndConditionsUrl(email);
//       return NextResponse.json({ message: "terms deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting terms:", error);
//       return NextResponse.json({ error: "Failed to delete terms" }, { status: 500 });
//     }
//   } else {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
// }