import React, { useEffect, useState } from "react";
import axios from "axios";
import {ChartOne} from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import Loader from "../common/Loader";

interface Message {
  id: string;
  conversationId: string;
  timestamp: Date;
  role: string;
  text: string;
}

interface Conversation {
  id: string;
  shopDomain: string;
  startedAt: Date;
  Message: Message[];
}

interface ChartOneProps {
  totalConversations: number;
  maxSumIndex: number;
  convArray: number[]; // Adjust the naming to camelCase
}

interface ChartTwoProps {
  conversationDistribution: number[];
}

interface ChatCardProps {
  lastThreeConversations: Conversation[]; // Adjust based on your actual conversation structure
}

type ECommerceData = {
  convArray: number[];
  conversationDistribution: number[];
  lastThreeConversations: Conversation[];
  maxSumIndex: number;
  totalConversations: number;
}



const ECommerce: React.FC = () => {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState<ECommerceData>({
    convArray: [],
    conversationDistribution: [],
    lastThreeConversations: [],
    maxSumIndex: 0,
    totalConversations: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get('/api/v1/data/home')
      setData(data.data);
      const conv_array = data.data
      console.log(conv_array)
      setloading(false)
    }
    fetchData();

  }, [])
  if (loading) {
    return <Loader />
  }
  else {
    return (
      <>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartOne
           maxSumIndex={data.maxSumIndex}
           convArray={data.convArray} />
          <ChartTwo 
          //  totalConversations={data.totalConversations} 

          // conversationDistribution={data.conversationDistribution}
          />
          <div className="col-span-12">
            <ChatCard 
            // lastThreeConversations={data.lastThreeConversations}
             />
          </div>
        </div>
      </>
    );
  }

};

export default ECommerce;
