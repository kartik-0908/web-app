"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import axios from "axios";



const Upgrade = () => {
  const [buttonloading, setbuttonloading] = useState(false);

  const handleSave = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    setbuttonloading(true)

    try {
      const response = await axios.post('api/v1/data/upgrade');
      const data = response.data;
      console.log('Success:', data);
    } catch (error) {
    }
    setbuttonloading(false)

  };
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Upgrade" />

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-6">
            <Card className="">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">NextUI</p>
                  <p className="text-small text-default-500">nextui.org</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody
                className="p-8 gap-6 text-2xl"
              >
                <div>
                  1500 Conversations/month
                </div>
                <p>
                  GPT-3.5 Turbo Powered Chatbot
                </p>
                <p>
                  Widget Customizations
                </p>
                <p>
                  Live Bot Analytics
                </p>
                <p>
                  2 Page Ingestion
                </p>
                <p>
                  Multi-Lingual Bot
                </p>
                <p>
                  Support Over email
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link
                  isExternal
                  showAnchorIcon
                  href="https://github.com/nextui-org/nextui"
                >
                  Visit source code on GitHub.
                </Link>
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-6">
            <Card className="">
              <CardHeader className="flex gap-3">
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">NextUI</p>
                  <p className="text-small text-default-500">nextui.org</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody
                className="p-8 gap-6 text-2xl"
              >
                <div>
                  2500 Conversations/month
                </div>
                <p>
                  All features of Basic Plan
                </p>
                <p>
                  Widget Customizations
                </p>
                <p>
                  No Yugaa Branding
                </p>
                <p>
                  Unlimited Page Ingestion
                </p>
                <p>
                  Highest Priority Access
                </p>
                <p>
                  Early access to Updats
                </p>
                <p>
                  Dedicated Account Manager
                </p>
                <p>
                  Round the clock Chat suppport (Whatsapp, Slack, Teams)
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
              <Button
                onClick={handleSave}
                isLoading={buttonloading}
                spinner={
                  <div className="flex flex-row">
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                    <h1>Doing authentication</h1>
                  </div>
                }
                fullWidth color="primary">
                {buttonloading ? "" : "Buy this Plan"}
              </Button>
              </CardFooter>
            </Card>

          </div>


        </div>

      </div>
    </DefaultLayout>
  );
};

export default Upgrade;
