// import {  NextResponse } from "next/server";
// import { auth } from "@/app/auth";
// import { getInstallationData } from "../../../../../../lib/services/user";

// export async function GET() {
//     const session = await auth();
//     if (session && session.user && session.user.email) {
//         console.log(session.user?.email)
//         const data = await getInstallationData(session.user?.email)
//         return NextResponse.json({
//             data
//         })
//     }
// }