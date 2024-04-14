"use client"
import axios from "axios";
import { Suspense, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default async function Integration() {
  const searchParams = useSearchParams()
  const router = useRouter();

  useEffect(() => {

    const getShopifyToken = async () => {
      const code = searchParams.get('code'); // Extract code
      const shop = searchParams.get('shop'); // Extract code
      if (code && shop) {
        try {
          console.log("insdie useeffect of integration")
          const response = await axios.post('/api/shopify/access-token', { shop, code });
          router.push('/installation')
        } catch (error) {
          console.error("Failed to retrieve access token:", error);
        }

      }
    };

    getShopifyToken();
  }, []);
  return (
    <Suspense>
      <div className="mx-auto max-w-270 p-6 h-screen">
        Loading your details
        integrating with your store
      </div>
    </Suspense>

  );
};
