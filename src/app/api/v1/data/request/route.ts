import {  NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { saveFeatureRequest } from "../../../../../../lib/services/user";

export async function POST(req : NextRequest) {
    const session = await auth();
    if (session && session.user && session.user.email) {
        const formData = await req.json();
        const email = session.user.email;
        console.log(formData)
        const updateResult = await saveFeatureRequest(email, formData.shortdesc, formData.message, formData.category);
        console.log(updateResult)
        return NextResponse.json({
            "data":"hello"
        })
    }
}