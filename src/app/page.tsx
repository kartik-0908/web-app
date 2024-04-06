import { Metadata } from "next";
import { Card, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
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
          <div className="w-[400px]  rounded-lg border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sign In 
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5 mt-5 flex items-center justify-between">
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline"
                  >
                    Forget password?
                  </Link>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>



    </>
  );
}
