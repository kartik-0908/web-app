import { Metadata } from "next";
import { Card, CardHeader,  Image  } from "@nextui-org/react";
import Signinform from "@/components/Welcome/signinform";
import { getServerSession } from "next-auth";
import nextAuthOptions from "../../lib/nextauth-config";
import { isShopInstalled } from "../../prisma/services/user";
import { redirect } from "next/navigation";



export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
      redirect("/home");
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="p-6 h-screen bg-gradient-to-r from-fuchsia-500 to-cyan-500">
          <Card isFooterBlurred className="h-full">
            <CardHeader className="absolute z-10 top-1 flex-col">
              <h4 className="font-bold text-6xl justify-center align-center">Welcome to YUGAA</h4>
              <div className="text-3xl text-black font-bold justify-center align-center p-32">
                <h1>Transfor the way you want to interact with your customers</h1>
              </div>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover "
              src="/images/landing_page.jpeg"
            />
          </Card>
        </div>
        <div className="bg-black flex justify-center items-center h-screen">
          <div className="rounded-lg border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
            <Signinform />
          </div>
        </div>
      </div>
    </>
  );
}
