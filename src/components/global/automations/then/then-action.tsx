import { useListener } from "@/hooks/use-automations";
import TriggerButton from "../trigger-button";


type Props={
  id:string
}

export default function  ThenNode({id}:Props){
  // hook used to setListener and update it in db using zod form
    const {onSetListener,listener,onFormSubmit,register,isPending}=useListener(id);
    return (
        <TriggerButton label="Then">asdf</TriggerButton>
    )
}