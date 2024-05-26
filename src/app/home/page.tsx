import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getHomeData } from "../../../prisma/services/user";
import ScatterChart from "@/components/Charts/scatterchart";
import ChartTwo from "@/components/Charts/ChartTwo";
import ChatCard from "@/components/Chat/ChatCard";
import { auth } from "../auth";

async function getUser() {
  const session = await auth()
  console.log('Session:', session);
  return session;
}
export default async function Home() {
  const session = await getUser()
  if(!session || !session.user){
    return (
      <h1>
        login first
      </h1>
    )
  }
  if (session && session.user && session.user.shopDomain) {
    const data = await getHomeData(session.user.shopDomain)
    return (
      <DefaultLayout>
        <>
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <ScatterChart
              currentWeekData={data.currentWeekData || []}
            />
            <ChartTwo
              last7days={data.last7Days || []}
            />
            <div className="col-span-12">
              <ChatCard
                lastThreeConversations={data?.lastThreeConversations  }
              />
            </div>
          </div>
        </>
        {/* <h1> */}
          {/* {JSON.stringify(session)} */}
          {/* {JSON.stringify(data.lastThreeConversations)} */}
        {/* </h1> */}
      </DefaultLayout>
    )
  }

}
