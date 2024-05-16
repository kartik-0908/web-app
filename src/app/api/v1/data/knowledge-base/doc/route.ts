import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { deleteKbDoc, getShop, updateKbDoc } from "../../../../../../../prisma/services/user";
import { deleteFileFromFolder, uploadFileToFolder, uploadLogo } from "../../../../../../../prisma/services/gcpservices";
import redis from "../../../../../../../lib/redis";


export async function POST(req: Request) {
  const session = await getServerSession();
  const formData = await req.formData();
  console.log(formData)
  if (session && session.user && session.user.email) {
    try {
      const doc = formData.get('file') as File;
      const email = session.user.email;
      const shop = await getShop(email);

      if (doc && shop) {
        const file_url = await uploadFileToFolder(doc, shop)
        if (file_url) {
          updateKbDoc(email, doc.name, file_url)
          const res = await redis.lpush('fetch-docs', JSON.stringify({ fileName: doc.name, shop: shop, publicUrl: file_url,type:"update" }));
        }
      }
      return NextResponse.json({
        "data": "success full change"
      })
    } catch (e) {
      console.log(e)
    }
  }
}


export async function DELETE(req: Request) {
  const session = await getServerSession();
  const body = await req.json();

  if (session && session.user && session.user.email) {
    try {
      const email = session.user.email;
      const shop = await getShop(email);
      console.log(body)
      const { fileName } = body

      if (shop && fileName) {
        // Delete the file from GCP
        await deleteFileFromFolder(shop, fileName);

        // Delete the file record from the database
        await deleteKbDoc(email, fileName);
        const res = await redis.lpush('fetch-docs', JSON.stringify({ fileName: fileName, shop: shop, publicUrl: "file_url",type:"delete" }));


        return NextResponse.json({ "data": "File deleted successfully" });
      } else {
        return NextResponse.json({ "error": "Shop not found" }, { status: 404 });
      }
    } catch (e) {
      console.log(e);
      return NextResponse.json({ "error": "Internal server error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ "error": "Unauthorized or missing fileName" }, { status: 401 });
  }
}


