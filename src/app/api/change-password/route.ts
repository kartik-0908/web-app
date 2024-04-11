import {  NextRequest, NextResponse } from "next/server";
import { updateUserPassword } from "../../../../prisma/services/user";

export async function POST(req : NextRequest) {
        const formData = await req.json();
        console.log(formData)
        const email  = formData.email
        const password  = formData.password
        const updateResult = await updateUserPassword(email, password );
        console.log(updateResult)
        return NextResponse.json({
            "data":"hello"
        })
}