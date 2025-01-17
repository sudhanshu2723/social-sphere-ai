import { getAutomationInfo } from "@/actions/automations"
import Trigger from "@/components/global/automations/trigger"
import ThenAction from "@/components/global/automations/then/then-action"
import AutomationBreadCrumb from "@/components/global/bread-crumbs/automations"
import { Warning } from "@/icons"
import { PrefetchUserAutomation } from "@/react-query/prefetch"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import ThenNode from "@/components/global/automations/then/node"
import PostNode from "@/components/global/automations/post/node"


type Props={
    params:{id:string}
}

// set some metadata
export async function generateMetadata({params}:{params:{id:string}}){
    // Getting all the details of automations associated with the user
    const info=await getAutomationInfo(params.id);
    return {
        title:info.data?.name
    }
}

export default async function Page({params}:Props){
        const query=new QueryClient();

        // function used to prefetch the user automations given an automationId
        await PrefetchUserAutomation(query,params.id); 
    return (
      <HydrationBoundary state={dehydrate(query)}>
          <div className="flex flex-col items-center gap-y-20">
            <AutomationBreadCrumb id={params.id}/>
            <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">
            <Warning />
            When...
          </div>
          <Trigger id={params.id} />
        </div>
        <ThenNode id={params.id} />
        <PostNode id={params.id} />
      </div>
 
      </HydrationBoundary>      
    )
}