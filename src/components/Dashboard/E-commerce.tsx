import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import Loader from "../common/Loader";
import ScatterChart from "../Charts/scatterchart";

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



interface ChartTwoProps {
  conversationDistribution: number[];
}

interface ChatCardProps {
  lastThreeConversations: Conversation[]; // Adjust based on your actual conversation structure
}

type ECommerceData = {
  lastThreeConversations: Conversation[];
  last7Days: number[],
  currentWeekData: number[][]
}



const ECommerce: React.FC = () => {
  const [loading, setloading] = useState(false);
  const [currentWeekData, setcurrentWeekData] = useState<number[][][]>([]);
  const [lastThreeConversations, setlastThreeConversations] = useState([]);
  const [last7Days, setlast7Days] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/v1/data/home')
      const { currentWeekData } = data.data;
      const { last7Days } = data.data;
      const { lastThreeConversations } = data.data;
      setcurrentWeekData(currentWeekData)
      setlast7Days(last7Days)
      setlastThreeConversations(lastThreeConversations)
      console.log(currentWeekData)
      console.log(last7Days)
      console.log(lastThreeConversations)
      // console.log(latestData)
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
          <ScatterChart
            currentWeekData={currentWeekData}
          />
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
