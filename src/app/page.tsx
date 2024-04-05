import { Metadata } from "next";
import { Card, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <div className="p-16 h-screen bg-gradient-to-r from-fuchsia-500 to-cyan-500">
        <Card isFooterBlurred className="h-[600px]">
          <CardHeader className="absolute z-10 top-1 flex-col ">
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
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10">
            <div className="p-8 flex flex-grow" >
              <Button radius="full" className="m-auto bg-black text-white w-[300px] h-[100px] text-3xl font-bold shadow-lg">
                <a href="/api/auth/login">Let's GO (LOGIN)</a>
              </Button>
            </div>
          </CardFooter>
        </Card>

      </div>


    </>
  );
}
