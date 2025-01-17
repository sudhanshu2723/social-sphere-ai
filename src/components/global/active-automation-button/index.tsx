import { Button } from "@/components/ui/button";
import { ActiveAutomation } from "@/icons/active-automation";
import Loader from "../loader";
import { useQueryAutomation } from "@/hooks/use-queries";
import useMutationData from "@/hooks/use-mutation-data";
import { activateAutomation } from "@/actions/automations";






export default function ActivateAutomationButton({id}:{id:string}){
    // Optmistic UI
    const {data}=useQueryAutomation(id);
    // Activating the automation 
    const {mutate,isPending}=useMutationData(['activate'],(data:{state:boolean})=>activateAutomation(id,data.state),'automation-info')
    return (
        <Button 
        // after clicking the button the activateAutomation function will be called and it will update the automation in real time
        onClick={()=>mutate({state:!data?.data?.active})}
        className="lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] ml-4">
           <Loader state={isPending}>
           <ActiveAutomation />
            <p className="lg:inline hidden">
               {data?.data?.active ? 'Disable' : 'Activate'} 
            </p>
           </Loader>
        </Button>
    )
}