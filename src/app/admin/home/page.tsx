import ScatterChart from "@/components/Charts/scatterchart";
import ChartTwo from "@/components/Charts/ChartTwo";
import ChatCard from "@/components/Chat/ChatCard";
import { redirect } from "next/navigation";
import { Button } from "@nextui-org/react";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  return (
    <AdminLayout>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ScatterChart
              currentWeekData={data.currentWeekData || []}
            />
            <ChartTwo
              last7days={data.last7Days || []}
            />
            <div className="col-span-12">
              <ChatCard
                lastThreeConversations={data?.lastThreeConversations}
              />
            </div> */}
      </div>
    </AdminLayout>

  )
  // }

}
