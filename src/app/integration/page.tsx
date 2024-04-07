"use client"
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { redirect } from "next/navigation";

const Settings = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {

    const getShopifyToken = async () => {
      const accessToken = await getAccessTokenSilently();
      const urlSearchParams = new URLSearchParams(window.location.search);
      const code = urlSearchParams.get('code'); // Extract code
      const shop = urlSearchParams.get('shop'); // Extract code

      if (code) {
        try {
          const response = await axios.post(`http://${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/auth/token`, { code, shop, accessToken });
          console.log('Token exchange successful:', response.data);
          // TODO: Store the token securely and proceed with the user session
          redirect('/home');
        } catch (err) {
          console.error('Error exchanging token:', err);
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

export default Settings;