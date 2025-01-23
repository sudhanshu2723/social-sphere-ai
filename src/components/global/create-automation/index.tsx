'use client'
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { AutomationDuoToneWhite } from "@/icons";
import useCreateAutomation from "@/hooks/use-automations";
import { v4 } from "uuid";
import { useMemo } from "react";



export default function CreateAutomation(){
    // give id to the new mutation
    const mutationId=useMemo(()=>v4(),[])
    console.log(mutationId)
    // hook used to create automation
    const {isPending,mutate}=useCreateAutomation(mutationId);
 
    return (
        <Button
        className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
        onClick={()=>mutate({name:'Untitled',id:mutationId,createdAt:new Date(),keywords:[]})}
      >
        <Loader state={false} >
        <span className="flex items-center gap-2">
          <AutomationDuoToneWhite />
          <p className="lg:inline hidden">Create an Automation</p>
        
        </span>
        </Loader>
      </Button>
    )
}