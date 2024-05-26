import { NextRequest, NextResponse } from "next/server";
import { updateBehavioralCustomization } from "../../../../../../../prisma/services/user";
import { auth } from "@/app/auth";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (session && session.user && session.user.email) {
        const formData = await req.json();
        const email = session.user.email;
        console.log(formData)
        const updateResult = await updateBehavioralCustomization(
            email, formData.responseLength, formData.clarificationPrompt, formData.apologyAndRetryAttempt, formData.errorMessageStyle, formData.greetingmessage);
        console.log(updateResult)
        return NextResponse.json({
            "data": "hello"
        })
    }
}