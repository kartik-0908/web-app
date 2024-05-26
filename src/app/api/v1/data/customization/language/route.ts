import { NextRequest, NextResponse } from "next/server";
import { updateLanguageCustomization } from "../../../../../../../prisma/services/user";
import { auth } from "@/app/auth";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (session && session.user && session.user.email) {
        const formData = await req.json();
        const email = session.user.email;
        console.log(formData)
        const updateResult = await updateLanguageCustomization(
            email, formData.toneAndStyle, formData.userGuidance, formData.positiveReinforcement, formData.errorHandling, formData.politeness, formData.clarityAndSimplicity, formData.personalization);
        console.log(updateResult)
        return NextResponse.json({
            "data": "hello"
        })
    }
}