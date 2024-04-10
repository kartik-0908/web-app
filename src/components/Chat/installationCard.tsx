// ConversationDetails.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Button, Input, Link } from '@nextui-org/react';

interface Message {
  id: string;
  timestamp: string;
  senderId: number;
  text: string;
  senderType: string;
}

interface Conversation {
  id: string;
  Message: Message[];
}

const InstallationCard = () => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [domain, setDomain] = useState('')

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

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const { data } = await axios.get('/api/v1/data/installation')
      const { shop } = data.data;
      // console.log(shop)
      const croppedShop = shop.slice(0, -14);
      setDomain(croppedShop);
      console.log("domain" + croppedShop)
      setLoading(false)
    }
    fetchData();
  }, [])

  if (loading) {
    return (
      <h1>
        Loading
      </h1>
    )
  }
  else {
    return (
      <div className="col-span-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="col-span-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Installation Instructions
            </h3>
          </div>
          <div className="pl-32 pr-32 p-2 ">
            <p>
              Welcome to our installation guide! We're thrilled to assist you in getting our bot set up and running smoothly on your website. Below, you'll discover step-by-step instructions to effortlessly integrate our bot into your site.
              Let's jump in and enhance visitor engagement in a whole new way!
            </p>
            <br></br>
            <br></br>
            <br></br>
            <Input
              placeholder="Enter your domain"
              type="text"
              defaultValue={domain}
              onValueChange={(value) => {
                setInputValue(value)
                console.log(inputValue)
              }}
              isDisabled={domain !== ""}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">.myshopify.com</span>
                </div>
              }
            />
            <br></br>
            <Button size="lg" onClick={handleSubmit}>
              Submit
            </Button>
            <p>
              To enable the Yugaa chat widget for your website visitors, simply navigate to the Shopify theme editor and toggle it on.Click on the belwo link to add the widget.
              <Link isBlock
                isExternal
                showAnchorIcon href={`https://${domain}.myshopify.com/admin/themes/current/editor?context=apps&activateAppId=ea9e1d5c-9897-48e6-9a2d-08b3db235ed0/chat-widget`} color="foreground">
                Click here to go to theme editor
              </Link>
            </p>
            <p>
              After saving the changes, the widget will become visible on your website. This activation process is quick and requires only two clicks.
            </p>
            <p>
              Make sure to visit your website where the chat widget code is installed to complete this step.
            </p>
            Congrats! You’ll replace a dumb bot with an intelligent one 😎
          </div>
        </div>
      </div>
    );
  }

};

export default InstallationCard;