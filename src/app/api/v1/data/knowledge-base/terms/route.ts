import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {  addTermsAndConditionsUrl, deleteTermsAndConditionsUrl, getShop } from "../../../../../../../prisma/services/user";
import redis from "../../../../../../../lib/redis";

export async function POST(request: Request) {
  const session = await getServerSession();

  if (session && session.user && session.user.email) {
    const email = session.user.email;
    const { termsurl } = await request.json();

    try {
      await addTermsAndConditionsUrl(email, termsurl);
      const shop = await getShop(email)
      const res = await redis.lpush('fetch-links', JSON.stringify({id: 1,shop: shop,url: termsurl}));

      return NextResponse.json({ message: "terms added successfully" });
    } catch (error) {
      console.error("Error adding FAQ URL:", error);
      return NextResponse.json({ error: "Failed to add terms URL" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession();

  if (session && session.user && session.user.email) {
    const email = session.user.email;

    try {
      await deleteTermsAndConditionsUrl(email);
      return NextResponse.json({ message: "terms deleted successfully" });
    } catch (error) {
      console.error("Error deleting terms:", error);
      return NextResponse.json({ error: "Failed to delete terms" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}