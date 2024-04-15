"use client"
import axios from "axios";
import { Suspense, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Loader from "@/components/common/Loader";

export default function Integration() {
  // const searchParams = useSearchParams()
  const router = useRouter();

  useEffect(() => {

    const getShopifyToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code'); // Extract code
      const shop = urlParams.get('shop');// Extract code
      console.log("integration code: " + code)
      console.log("integration shop: " + shop)
      if (code && shop) {
        try {
          console.log("insdie useeffect of integration")
          const response = await axios.post('/api/shopify/access-token', { shop, code });
          console.log(response);
          router.push('/installation')
        } catch (error) {
          console.error("Failed to retrieve access token:", error);
        }

      }
    };

    getShopifyToken();
  }, []);
  return (
    <div className="mx-auto max-w-270 p-6 h-screen">
      <Loader/>
    </div>

  );
};
