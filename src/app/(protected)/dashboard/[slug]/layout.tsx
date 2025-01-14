import InfoBar from "@/components/global/infobar"
import Sidebar from "@/components/global/sidebar"
import { client } from "@/lib/prisma"
import { prefetchUserAutomations, PrefetchUserProfile } from "@/react-query/prefetch"
import { dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'

type Props={
    children:React.ReactNode 
    params:{slug:string}
}


export default async function Layout({children,params}:Props){
    
    const query=new QueryClient();
    // prefetch the data for different server actions

    // prefetch user profile
    await PrefetchUserProfile(query)
    // prefetch user automations
    await prefetchUserAutomations(query);
    
    return (
        // if we need to cache and access server side caching then wrap it aroung HydrationBoundary 
        <HydrationBoundary state={dehydrate(query)}>
        <div className="p-3">
            {/* Sidebar */}
            <Sidebar slug={params.slug}/>
            <div
          className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
            <InfoBar slug={params.slug}/>
          
            {children}
            </div>
        </div>
        </HydrationBoundary>
    )
}