"use client"
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loader from "@/components/common/Loader";
import { useEffect, useState } from "react";


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
      <DefaultLayout>
        {/* <h1>hello</h1> */}
        <ECommerce />
      </DefaultLayout>
    )


  }
}
