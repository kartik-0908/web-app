import { NextRequest, NextResponse } from "next/server";
import { createUser, initializeDefaultCustomization, initializePlan } from "../../../../../prisma/services/user";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email } = data;
  const { password } = data;
  const { shopifyDomain } = data;
  const user = await createUser(email, password, shopifyDomain);
  await initializeDefaultCustomization(email)
  await initializePlan(shopifyDomain);
  console.log(user)
  return NextResponse.json({
    "data": "success"
  })

}