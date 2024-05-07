import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { addVideoLink, getShop, removeVideoLink, updateAppearance, updateKbDoc, updateLogo } from "../../../../../../../prisma/services/user";
import { checkFileExists, deleteFileByEmail, uploadFileToFolder, uploadLogo } from "../../../../../../../prisma/services/gcpservices";


export async function POST(req: Request) {
    const session = await getServerSession();
    const body = await req.json();
    if (session && session.user && session.user.email) {
        try {
            const {url} = body; 
            console.log(body)
            const email = session.user.email;
            await addVideoLink(email, url)
            return NextResponse.json({
                "data": "success full change"
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession();
    const body = await req.json();
    if (session && session.user && session.user.email) {
        try {
            const {url} = body; 
            const email = session.user.email;
            await removeVideoLink(email, url)
            return NextResponse.json({
                "data": "success full change"
            })
        } catch (e) {
            console.log(e)
        }
    }
}








