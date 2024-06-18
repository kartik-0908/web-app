// import { NextResponse } from "next/server";
// import redis from "../../../../../../../lib/redis";
// import { get } from "http";
// import { auth } from "@/app/auth";
// import { addVideoLink ,getShop, removeVideoLink, updateAppearance, updateKbDoc, updateLogo} from "../../../../../../../lib/services/user";


// export async function POST(req: Request) {
//     const session = await auth();
//     const body = await req.json();
//     if (session && session.user && session.user.email) {
//         try {
//             const { url } = body;
//             console.log(body)
//             const email = session.user.email;
//             await addVideoLink(email, url)
//             const shop = await getShop(email)
//             const res = await redis.lpush('fetch-video', JSON.stringify({ shop: shop, url: url }));

//             return NextResponse.json({
//                 "data": "success full change"
//             })
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }

// export async function DELETE(req: Request) {
//     const session = await auth();
//     const body = await req.json();
//     if (session && session.user && session.user.email) {
//         try {
//             const { url } = body;
//             const email = session.user.email;
//             await removeVideoLink(email, url)
//             return NextResponse.json({
//                 "data": "success full change"
//             })
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }








