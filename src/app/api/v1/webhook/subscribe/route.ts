import { getServerSession } from "next-auth";
import { getTokenwithShop, saveWebhookDetails } from "../../../../../../prisma/services/user";
import { NextResponse } from "next/server";
import axios from 'axios';

const webhookurl = "https://my-app.kartikagarwal0908.workers.dev/webhooks/"


export async function POST() {
    const session = await getServerSession();
    if (session && session.user && session.user.email) {
        const data = await getTokenwithShop(session.user.email)
        console.log(data);
        const { shop }: any = data;
        const { accessToken }: any = data;

        
        return NextResponse.json({
            "sucess": "successfull"
        })
    }
}

