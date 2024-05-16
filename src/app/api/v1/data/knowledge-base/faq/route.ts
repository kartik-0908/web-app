import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { addFaqUrl, deleteFaqUrl, getShop } from "../../../../../../../prisma/services/user";
import redis from "../../../../../../../lib/redis";

export async function POST(request: Request) {
  const session = await getServerSession();

  if (session && session.user && session.user.email) {
    const email = session.user.email;
    const { faqurl } = await request.json();

    try {
      await addFaqUrl(email, faqurl);
      const shop = await getShop(email)
      const res = await redis.lpush('fetch-links', JSON.stringify({id: 0,shop: shop,url: faqurl, type:"update"}));

      return NextResponse.json({ message: "FAQ URL added successfully" });
    } catch (error) {
      console.error("Error adding FAQ URL:", error);
      return NextResponse.json({ error: "Failed to add FAQ URL" }, { status: 500 });
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
      await deleteFaqUrl(email);
      return NextResponse.json({ message: "FAQ URL deleted successfully" });
    } catch (error) {
      console.error("Error deleting FAQ URL:", error);
      return NextResponse.json({ error: "Failed to delete FAQ URL" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}