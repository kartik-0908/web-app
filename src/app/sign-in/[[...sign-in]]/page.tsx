import { SignIn } from "@clerk/nextjs";
import { Card, CardHeader, Image } from "@nextui-org/react";

export default function Page() {
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
        <div className="bg-black flex justify-center items-center  h-screen">
          <div className="mx-auto my-auto text-5xl ">
            <SignIn
            signUpUrl="/email/sign-up"
            appearance={{
              variables:{
                fontSize:"16px"
              }
            }}
            />

          </div>
        </div>
      </div>
    </>
  );
}