import { Card, CardHeader, Image } from "@nextui-org/react";
import Signinform from "@/components/Welcome/signinform";
import { getServerSession } from "next-auth";
import nextAuthOptions from "../../lib/nextauth-config";
import { redirect } from "next/navigation";
import { createHmac } from 'crypto';
import { Metadata } from "next";


export const metadata: Metadata = {
  title:
    "Yugaa",
  description: "Modern way to interact with your customers",
};

export default async function Home(props: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // console.log("search paarms :", props.searchParams)
  const session = await getServerSession(nextAuthOptions);
  const { shop, timestamp, hmac } = props.searchParams;
  if (shop) {
    const clientId = process.env.NEXT_PUBLIC_clientId;
    const scopes = process.env.NEXT_PUBLIC_scopes;
    const redirectUri = process.env.NEXT_PUBLIC_redirectUri;
    const shopifyAuthUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
    // console.log(shopifyAuthUrl)
    redirect(shopifyAuthUrl);
  }

  if (session) {
    redirect("/home");
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:block hidden h-screen bg-gradient-to-br from-dark-blue to-light-blue">
          <Card isFooterBlurred className="h-full">
            <CardHeader className="absolute z-10 top-1 flex-col">
              <h4 className="font-bold text-6xl justify-center align-center">Welcome to YUGAA</h4>
              <div className="text-3xl text-black font-bold justify-center align-center ">
                <h1>Transform the way you want to interact with your customers</h1>
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
