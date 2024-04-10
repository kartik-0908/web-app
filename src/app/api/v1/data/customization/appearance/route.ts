import { getServerSession } from "next-auth"
import {  NextRequest, NextResponse } from "next/server";
import { updateAppearance } from "../../../../../../../prisma/services/user";

export async function POST(req : NextRequest) {
    const session = await getServerSession();
    if (session && session.user && session.user.email) {
        const formData = await req.json();
        const email = session.user.email;
        console.log(formData)
        const updateResult = await updateAppearance(email, formData.selectedColor, formData.fontFamily, formData.fontColor, formData.widgetPosition);
        console.log(updateResult)
        return NextResponse.json({
            "data":"hello"
        })
    }
}