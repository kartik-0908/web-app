import { Metadata } from "next";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <div className="p-16 h-screen bg-gradient-to-r from-fuchsia-500 to-cyan-500">
        <Card className="py-4 h-[600px]">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <h4 className="font-bold text-6xl">Welcome to YUGAA</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="/images/hero-card-complete.jpeg"
              width={270}
            />
          </CardBody>
        </Card>

      </div>


    </>
  );
}
