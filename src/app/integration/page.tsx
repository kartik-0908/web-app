"use client"
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default async function Integration() {
  const router = useRouter();

  useEffect(() => {

    const getShopifyToken = async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const code = urlSearchParams.get('code'); // Extract code
      const shop = urlSearchParams.get('shop'); // Extract code
      if (code && shop) {
        try {
          const response = await axios.post('/api/shopify/access-token', { shop, code });
          router.push('/home')
        } catch (error) {
          console.error("Failed to retrieve access token:", error);
        }

      }
    };

    getShopifyToken();
  }, []);
  return (
    <div className="mx-auto max-w-270 p-6 h-screen">
      Loading your details
      integrating with your store
    </div>
  );
};
