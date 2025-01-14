import { getAllAutomations, getAutomationInfo } from "@/actions/automations";
import { onUserInfo } from "@/actions/user";
import { QueryClient, QueryFunction } from "@tanstack/react-query";



// staleTime:The time in milliseconds after data is considered stale. If the data is fresh it will be returned from the cache
export async function prefetch(client:QueryClient,action:QueryFunction,key:string) {
    return await client.prefetchQuery({
        queryKey:[key],
        queryFn:action,
        staleTime:60000
    })
    
}

// function used to prefetch the user details using Query-client
export async function PrefetchUserProfile(client:QueryClient){
        const prefetchUser=await prefetch(client,onUserInfo,'user-profile');
        return prefetchUser;
} 

// function used to prefetch all the user automations
export async function prefetchUserAutomations(client:QueryClient){
    const prefetchAutomations=await prefetch(client,getAllAutomations,'user-automations');
   return prefetchAutomations;
}

// function used to prefetch a single user automation given an automation Id
export async function PrefetchUserAutomation(client:QueryClient,automationId:string) {
    return await prefetch(client,()=>getAutomationInfo(automationId),'automation-info')
}