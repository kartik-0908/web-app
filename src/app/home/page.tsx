"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loader from "@/components/common/Loader";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import AuthWrapper from "../AuthWrapper.tsx";
const ECommerce = dynamic(() => import('@/components/Dashboard/E-commerce'), { ssr: false });


export default function Home() {
  const [loading, setloading] = useState(true);
  useEffect(() => {

    setloading(false);
  }, [])
  if (loading) {
    <Loader />
  }
  else {
    return (
      <AuthWrapper>
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      </AuthWrapper>
    )


  }
}
