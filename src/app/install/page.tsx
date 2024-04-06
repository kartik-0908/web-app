"use client"
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";

const Settings = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue) {
      const clientId = process.env.NEXT_PUBLIC_clientId;
      const scopes = process.env.NEXT_PUBLIC_scopes;
      const redirectUri = process.env.NEXT_PUBLIC_redirectUri; // Update with your frontend callback route
      const shopifyAuthUrl = `https://${inputValue}.myshopify.com/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
      console.log(shopifyAuthUrl)
      window.location.href = shopifyAuthUrl;
    }
  };

  return (
    <div className="mx-auto max-w-270 p-6 h-screen">
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Enter Your Shopify Domain
            </h3>
          </div>
          <div className="pl-32 pr-32 p-2">
            <Input
              type="url"
              placeholder="your_shopify_domain"
              onChange={handleInputChange}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">.myshopify.com</span>
                </div>
              }
            />
            <Button size="lg" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;