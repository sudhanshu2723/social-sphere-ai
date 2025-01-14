'use client'
import { useQueryAutomation } from "@/hooks/use-queries"
import ActiveTrigger from "./active";
import { Separator } from "@/components/ui/separator";


type Props={
    id:string 
}

export default function Trigger({id}:Props){
    // hook used to store some state in application
    const {data}=useQueryAutomation(id);

    // if(data?.data && data?.data?.trigger.length>0){
        return (
            <div className="flex flex-col gap-y-6 items-center">
                <ActiveTrigger type="COMMENT" keywords={[
                    {
                        id:"dasfdgb",
                        word:"sdvfdgbf",
                        automationId:id
                    }

                ]}  />
                 <>
            <div className="relative w-6/12 my-4">
              <p className="absolute transform  px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
                or
              </p>
              <Separator
                orientation="horizontal"
                className="border-muted border-[1px]"
              />
            </div>
            <ActiveTrigger
              type={"data.data.trigger[1].type"}
              keywords={[
                {
                    id:"dasfdgb",
                    word:"sdvfdgbf",
                    automationId:id
                }

            ]}
            />
          </>
      
            </div>
        )
    // }   
   
}