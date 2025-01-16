"use client"
import { useListener } from "@/hooks/use-automations";
import TriggerButton from "../trigger-button";
import { AUTOMATION_LISTENERS } from "@/constants/automation";
import SubscriptionPlan from "../../subscription-plan";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";


type Props={
  id:string
}

export default function  ThenAction({id}:Props){
  // hook used to setListener and update it in db using zod form
    const {onSetListener,listener:Listener,onFormSubmit,register,isPending}=useListener(id);
    return (
        <TriggerButton label="Then">
          <div className="flex flex-col gap-y-2">
            {AUTOMATION_LISTENERS.map((listener)=>
            listener.type==='SMARTAI' ? 
            // if you are a pro user then only it will render the children
            <SubscriptionPlan key={listener.type} type="PRO">
              <div
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  // if the user clicks on the same listener
                  Listener === listener.type
                    ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
                    : 'bg-background-80',
                  'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
                )}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </SubscriptionPlan>
            :
            'hhhh')}
          <form
          onSubmit={onFormSubmit}
          className="flex flex-col gap-y-2"
        >
          <Textarea
            placeholder={
              Listener === 'SMARTAI'
                ? 'Add a prompt that your smart ai can use...'
                : 'Add a message you want send to your customers'
            }
            {...register('prompt')}
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Input
            {...register('reply')}
            placeholder="Add a reply for comments (Optional)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Button className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]">
            <Loader state={isPending}>Add listener</Loader>
          </Button>
        </form>
          </div>
        </TriggerButton>
    )
}