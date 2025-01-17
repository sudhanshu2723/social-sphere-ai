import { getAllAutomations, getAutomationInfo, getProfilePosts } from "@/actions/automations";
import { onUserInfo } from "@/actions/user";
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
// hook used to get the user profile info
export function useQueryUser(){
    return useQuery({
        queryKey:['user-profile'],
        queryFn:onUserInfo
    })
}

// hook used to get all the posts which the user have put in insta
export const useQueryAutomationPosts = () => {
    const fetchPosts = async () => await getProfilePosts()
    return useQuery({
      queryKey: ['instagram-media'],
      queryFn: fetchPosts,
    })
  }
  