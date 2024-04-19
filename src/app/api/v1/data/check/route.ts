import { NextRequest, NextResponse } from "next/server";
import { check_token } from "../../../../../../prisma/services/user";

export async function POST (req: NextRequest){
    const data = await req.json();
    const {inputValue} = data;
    const check = await  check_token(inputValue);
    if(check){
        return NextResponse.json({
            "status": "present"
        })
    }
    else {
        return NextResponse.json({
            "status": "absent"
        })
    }
}