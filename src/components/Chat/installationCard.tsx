// ConversationDetails.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Button, Input, Link } from '@nextui-org/react';
import Loader from '../common/Loader';

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
  const [buttonloading, setbuttonloading] = useState(false);

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

  const handlefetchData = async () => {
    setbuttonloading(true)
    const resp = await axios.post('/api/v1/data/fetch-data');
    console.log(resp);
    setbuttonloading(false)
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const { data } = await axios.get('/api/v1/data/installation')
      if (data && data.data && data.data.shop) {
        const { shop } = data.data;
        const croppedShop = shop.slice(0, -14);
        setDomain(croppedShop);
        console.log("domain" + croppedShop)
      }
      setLoading(false)
    }
    fetchData();
  }, [])

  if (loading) {
    return (
      <div className='w-full'>
        <Loader />

      </div>
    )
  }
  else {
    return (
      <div className="col-span-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="col-span-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="text-3xl font-bold text-center text-black dark:text-white">
              Installation Instructions
            </h3>
          </div>
          <div className="pl-32 pr-32 p-2">
            <p>
              Welcome to our installation guide! We're thrilled to assist you in getting our bot set up and running smoothly on your website. Below, you'll discover step-by-step instructions to effortlessly integrate our bot into your site.
              Let's jump in and enhance visitor engagement in a whole new way!
            </p>
            <Input
              className='pl-32 pr-32 pt-4'
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
            <div className='text-center'>
              <Button size="lg" onClick={handleSubmit}>
                Submit
              </Button>
            </div>

            <p className='pt-4'>
              To enable the Yugaa chat widget for your website visitors, simply navigate to the Shopify theme editor and toggle it on. Click on the below link to add the widget.
              <div className='text-center'>
                <Link isBlock
                  isExternal
                  showAnchorIcon href={`https://${domain}.myshopify.com/admin/themes/current/editor?context=apps&activateAppId=ea9e1d5c-9897-48e6-9a2d-08b3db235ed0/chat-widget`} color="foreground">
                  Click here to go to theme editor
                </Link>
              </div>

            </p>
            <p className='pt-4'>
              After saving the changes, the widget will become visible on your website. This activation process is quick and requires only two clicks.
            </p>
            <p className='pt-4'>
              Make sure to visit your website where the chat widget code is installed to complete this step.
            </p>
            <br></br>
            <p>
            Congrats! You’ll replace a dumb bot with an intelligent one 😎
            </p>
            <br></br>
            <br></br>

            <Button
              isLoading={buttonloading}
              onClick={handlefetchData}
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
                  <h1>Saving Changes</h1>
                </div>
              }
            >
              {buttonloading ? "" : "Fetch Data"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

};

export default InstallationCard;