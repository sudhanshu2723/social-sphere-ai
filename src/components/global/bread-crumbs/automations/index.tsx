"use client"
import { PencilDuoToneBlack } from "@/icons"
import { ChevronRight, PencilIcon } from "lucide-react"
import ActivateAutomationButton from "../../active-automation-button"
import { useQueryAutomation } from "@/hooks/use-queries"
import { useEditAutomation } from "@/hooks/use-automations"
import { useMutationDataState } from "@/hooks/use-mutation-data"
import { Input } from "@/components/ui/input"


type Props={
    id:string 
}

export default function AutomationBreadCrumb({id}:Props){
    //hook used to get single automation data given automationId
    const {data}=useQueryAutomation(id);
    // hook used to edit automation
    // edit->useState if it is true then show Input tag otherwise show automation name
    // enableEdit->function used to enable editing process by making edit=true
    // disableEdit->function used to disable editing process by making edit=false
    const {edit,enableEdit,inputRef,isPending}=useEditAutomation(id);
    const {latestVariable}=useMutationDataState(['update-automation']);

    return (
        <div className="rounded-full w-full p-5 bg-[#18181B1A] flex items-center">
            <div className="flex items-center gap-x-3 min-w-0">
            <p className="text-[#9B9CA0] truncate">Automations</p>
            <ChevronRight
             className="flex-shrink-0"
            color="#9B9CA0"
            />
            <span className="flex gap-x-3 items-center min-w-0">
                {edit ? 
                <Input ref={inputRef} placeholder={
                    isPending ? latestVariable.variables : 'Add a new name'
                
                } className="bg-transparent h-auto outline-none text-base border-none p-0"/> :
                <p className="text-[#9BCA0] truncate">
                    {latestVariable?.variables ? latestVariable?.variables.name : data?.data?.name}
                    </p>
                }
                
               {edit ? <></>:  <span onClick={enableEdit} className="cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4">
                    <PencilIcon size={14}/>
                </span>}
            </span>
            </div>
            <div className="flex items-center ml-auto gap-x-5">
                <p className="hidden md:block text-text-secondary/60 text-sm truncate min-w-0">
                All Updates are automatically saved</p>
                <div className="flex gap-x-5">
                    <p className="text-text-secondary text-sm truncate min-w-0">
                        Changes Saved 
                    </p>
                    {/* <p className="text-text-secondary text-sm truncate min-w-0">Undo | Redo</p> */}
                </div>
            </div>
            <ActivateAutomationButton/>
        </div>
    )
}