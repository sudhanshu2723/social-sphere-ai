import { getAllAutomations, getAutomationInfo } from "@/actions/automations";
import { useQuery } from "@tanstack/react-query";


// hook used to retrieve all the automations
export  function useQueryAutomations(){
    const automations=useQuery({
        queryKey:['user-automations'],
        queryFn:getAllAutomations
    })
    return automations;
}

export function useQueryAutomation(id:string){
    return useQuery({
        queryKey:['automation-info'],
        queryFn:()=>getAutomationInfo(id)
    })
}