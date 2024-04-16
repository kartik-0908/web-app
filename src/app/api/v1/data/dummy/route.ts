import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server";
import { getStoreData, insertDummy } from "../../../../../../prisma/services/user";
import { randomUUID } from "crypto";


export async function GET() {
    // await insertDummy()
    return NextResponse.json({
        "hello": "hello"
    })
}
