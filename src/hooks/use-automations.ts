import { createAutomations, saveListener, updateAutomatioName } from "@/actions/automations";
import useMutationData from "./use-mutation-data";
import { useEffect, useRef, useState } from "react";
import {z} from 'zod'; 
import useZodForm from "./use-zod-form";


export default  function useCreateAutomation(id?:string){
    const {isPending,mutate}=useMutationData(
        ['create-automation'],
        ()=>createAutomations(id),
        'user-automations'
        
    )
    return {isPending,mutate}
}

// hook used to edit the automation
export function useEditAutomation(automationId:string){
    // useState which tells wheater editing is true or false
    const [edit,setEdit]=useState(false)
    const inputRef=useRef<HTMLInputElement | null>(null);
    // function used to enable editing
    const enableEdit=()=>setEdit(true)
    // function used to disable editing
    const disableEdit=()=>setEdit(false)
    // Mutation used to update the data
    const {isPending,mutate}=useMutationData(
        ['update-automation'],
        (data:{name:string})=>updateAutomatioName(automationId,{name:data.name}) ,
        'automation-info',
        disableEdit
    )
    // useffect used to updateAutomation
    useEffect(() => {
        function handleClickOutside(this: Document, event: MouseEvent) {
          if (
            inputRef.current &&
            !inputRef.current.contains(event.target as Node | null)
          ) {
            if (inputRef.current.value !== '') {
              mutate({ name: inputRef.current.value })
            } else {
              disableEdit()
            }
          }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [])
    
      return {
        edit,
        enableEdit,
        disableEdit,
        inputRef,
        isPending,
      }

}

// hook used to listen to triggers
export function useListener(id:string){
    const [listener,setListener]=useState<'MESSAGE' | 'SMARTAI'>('MESSAGE');
    const promptSchema=z.object({
        prompt:z.string().min(1),
        reply:z.string()
    })
// mutation used to add event listener
    const {isPending,mutate}=useMutationData(['create-lister'],(data:{prompt:string,reply:string})=>saveListener(id,listener,data.prompt,data.reply),"automation-info");
    const {}=useZodForm()
}