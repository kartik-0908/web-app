import { NextResponse } from "next/server";
import {  addHelpUrl,  deleteHelpUrl, getShop } from "../../../../../../../prisma/services/user";
import redis from "../../../../../../../lib/redis";
import { auth } from "@/app/auth";

export async function POST(request: Request) {
  const session = await auth();

  if (session && session.user && session.user.email) {
    const email = session.user.email;
    const { helpurl } = await request.json();

    try {
      await addHelpUrl(email, helpurl);
      const shop = await getShop(email)

      const res = await redis.lpush('fetch-links', JSON.stringify({id: 2,shop: shop,url: helpurl,type: "update"}));

      return NextResponse.json({ message: "help added successfully" });
    } catch (error) {
      console.error("Error adding help URL:", error);
      return NextResponse.json({ error: "Failed to add help URL" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();

  if (session && session.user && session.user.email) {
    const email = session.user.email;

    try {
      await deleteHelpUrl(email);
      return NextResponse.json({ message: "help deleted successfully" });
    } catch (error) {
      console.error("Error deleting help:", error);
      return NextResponse.json({ error: "Failed to delete help" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}