// ConversationDetails.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Link } from '@nextui-org/react';
import Loader from '../common/Loader';

const InstallationCard = () => {
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState('')

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const { data } = await axios.get('/api/v1/data/installation')
      if (data && data.data && data.data.shop) {
        const { shop } = data.data;
        const croppedShop = shop.slice(0, -14);
        setDomain(croppedShop);
      }
      setLoading(false)
    }
    fetchData();
  }, [])

  if (loading) {
    return (
      <div className="col-span-5 ">
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
          <div className="pl-32 pr-32 p-2 text-justify">
            <div>
              Welcome to our installation guide! We're thrilled to assist you in getting our bot set up and running smoothly on your website. Below, you'll discover step-by-step instructions to effortlessly integrate our bot into your site.
              Let's jump in and enhance visitor engagement in a whole new way!
            </div>
            <Input
              className='pl-32 pr-32 pt-4'
              placeholder="Enter your domain"
              type="text"
              defaultValue={domain}
              isDisabled={domain !== ""}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">.myshopify.com</span>
                </div>
              }
            />
            <div className='pt-4'>
              To enable the Yugaa chat widget for your website visitors, simply navigate to the Shopify theme editor and toggle it on. Click on the below link to add the widget.
              <div className='text-center pt-4'>
                <Link isBlock
                  isExternal
                  showAnchorIcon href={`https://${domain}.myshopify.com/admin/themes/current/editor?context=apps&activateAppId=ea9e1d5c-9897-48e6-9a2d-08b3db235ed0/chat-widget`} color="foreground">
                  Click here to go to theme editor
                </Link>
              </div>

            </div>
            <div className='pt-4'>
              After saving the changes, the widget will become visible on your website. This activation process is quick and requires only two clicks.
            </div>
            <div className='pt-4'>
              Make sure to visit your website where the chat widget code is installed to complete this step.
            </div>
            <div className='pt-4'>
              Congrats! You’ll replace a dumb bot with an intelligent one 😎
            </div>
          </div>
        </div>
      </div>
    );
  }

};

export default InstallationCard;