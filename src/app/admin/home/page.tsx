import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ScatterChart from "@/components/Charts/scatterchart";
import ChartTwo from "@/components/Charts/ChartTwo";
import ChatCard from "@/components/Chat/ChatCard";
import { auth, unstable_update } from "../auth";
import { redirect } from "next/navigation";
import { Button } from "@nextui-org/react";
import { getHomeData } from "../../../../lib/services/user";
import AuthWrapper from "../../AuthWrapper";

async function getUser() {
  const session = await auth()
  console.log(session)
  if(!session) return null
  return session;
}
export default async function Home() {
  const session = await getUser()

  // if (session && session.user && session.user) {
  // const data = await getHomeData(session.user.shopDomain)
  return (
    <AuthWrapper>

      <DefaultLayout>
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
        {JSON.stringify({session})}
      </DefaultLayout>
    </AuthWrapper>

  )
  // }

}
