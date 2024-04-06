"use client"
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useRouter } from "next/router";

const Settings = () => {
  const [inputValue, setInputValue] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  // useEffect(() => {

  //   const getShopifyToken = async () => {
  //     const accessToken = await getAccessTokenSilently();
  //     const urlSearchParams = new URLSearchParams(window.location.search);
  //     const code = urlSearchParams.get('code'); // Extract code
  //     const shop = urlSearchParams.get('shop'); // Extract code

  //     if (code) {
  //       try {
  //         const response = await axios.post('http://localhost:8080/api/v1/user/auth/token', { code, shop, accessToken });
  //         console.log('Token exchange successful:', response.data);
  //         // TODO: Store the token securely and proceed with the user session
  //         router.push('/home');
  //       } catch (err) {
  //         console.error('Error exchanging token:', err);
  //       }
  //     }
  //   };

  //   getShopifyToken();
  // }, []);
  return (
    <div className="mx-auto max-w-270 p-6 h-screen">
      Loading your details 
      integrating with your store
    </div>
  );
};

export default Settings;