"use client";
import React, { useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import Loader from "../common/Loader";

const ECommerce: React.FC = () => {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(false);
  }, [])
  if (loading) {
    return <Loader />
  }
  else {
    return (
      <>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartOne />
          <ChartTwo />
          <div className="col-span-12">
            <ChatCard />
          </div>
        </div>
      </>
    );
  }

};

export default ECommerce;
