"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import axios from "axios";



const Upgrade = () => {
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const [button1loading, setbutton1loading] = useState(false);
  const [button2loading, setbutton2loading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
    conversations: 0,
    price: 0,
  });

  const handleSave = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (selectedCard === 1) {
      setbutton1loading(true)
    }
    else {
      setbutton2loading(true);
    }

    try {
      const response = await axios.post('api/v1/data/upgrade', {
        conversations: selectedPlan.conversations,
        price: selectedPlan.price
      });
      const data = response.data;
      console.log('Success:', data);
    } catch (error) {
    }
    setbutton1loading(false)
    setbutton2loading(false)

  };
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Upgrade" />

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-6">
            <Card
              isPressable
              onPress={() => {
                setSelectedCard(1);
                setSelectedPlan({ conversations: 1500, price: 10 })
              }}
              className={selectedCard === 1 ? "border-2 border-blue-500" : ""}
            >
              <CardHeader className=" gap-3">
                <div className="w-full ">
                  <div className="text-2xl font-bold">
                    $69/ 1500 conversations

                  </div>
                  <div className="">
                    Select this to get Basic Plan for yourself
                  </div>
                </div>



              </CardHeader>
              <Divider />
              <CardBody
                className="p-8 gap-6 text-2xl"
              >
                <div>
                  1500 Conversations/month
                </div>
                <div>
                  GPT-3.5 Turbo Powered Chatbot
                </div>
                <div>
                  Widget Customizations
                </div>
                <div>
                  Live Bot Analytics
                </div>
                <div>
                  2 Page Ingestion
                </div>
                <div>
                  Multi-Lingual Bot
                </div>
                <div>
                  Support Over email
                </div>
              </CardBody>
              <Divider />
              <CardFooter
              >
                <div className="w-full">
                  <Button
                    onClick={handleSave}
                    isLoading={button1loading}
                    disableAnimation
                    disabled={selectedCard !== 1}
                    className={`${selectedCard !== 1
                      ? "cursor-not-allowed opacity-50 hover:bg-inherit"
                      : "bg-blue-500 text-white"
                      }`}
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
                        <h1>Redirecting to Shopify</h1>
                      </div>
                    }
                    color={selectedCard === 1 ? "primary" : "default"}
                  >
                    {button1loading ? "" : "Buy this Plan"}
                  </Button>
                </div>

              </CardFooter>
            </Card>
          </div>
          <div className="col-span-6">
            <Card
              isPressable
              onPress={() => {
                setSelectedCard(2);
                setSelectedPlan({ conversations: 2500, price: 20 });
              }}
              className={selectedCard === 2 ? "border-2 border-blue-500" : ""}
            >
              <CardHeader className="flex gap-3">
                <div className="w-full ">
                  <div className="text-2xl font-bold">
                    $99/ 2500 conversations

                  </div>
                  <div className="">
                    Select this to get Pro Plan for yourself
                  </div>
                </div>
              </CardHeader>
              <Divider />
              <CardBody
                className="p-8 gap-6 text-2xl"
              >
                <div>
                  2500 Conversations/month
                </div>
                <div>
                  All features of Basic Plan
                </div>
                <div>
                  Widget Customizations
                </div>
                <div>
                  No Yugaa Branding
                </div>
                <div>
                  Unlimited Page Ingestion
                </div>
                <div>
                  Highest Priority Access
                </div>
                <div>
                  Early access to Updats
                </div>
                <div>
                  Dedicated Account Manager
                </div>
                <div>
                  Round the clock Chat suppport (Whatsapp, Slack, Teams)
                </div>
              </CardBody>
              <Divider />
              <CardFooter
              >
                <div className="w-full">
                <Button
                  onClick={handleSave}
                  isLoading={button2loading}
                  disabled={selectedCard !== 2}
                  className={`${selectedCard !== 2
                    ? "cursor-not-allowed opacity-50 hover:bg-inherit"
                    : "bg-blue-500 text-white"
                    }`}
                  color={selectedCard === 2 ? "primary" : "default"}
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
                      <h1>Redirecting to Shopify</h1>
                    </div>
                  }
                >
                  {button2loading ? "" : "Buy this Plan"}
                </Button>
                </div>
                
              </CardFooter>
            </Card>

          </div>


        </div>

      </div>
    </DefaultLayout>
  );
};

export default Upgrade;
