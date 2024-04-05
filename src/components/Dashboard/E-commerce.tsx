"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";

const ECommerce: React.FC = () => {
  return (
    <>
   

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

        <ChartOne />
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        <div className="col-span-12">
          {/* <TableFour /> */}
          <ChatCard />
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default ECommerce;
