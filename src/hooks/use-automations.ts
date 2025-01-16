import { createAutomations, deleteKeyword, saveKeyword, saveListener, saveTrigger, updateAutomatioName } from "@/actions/automations";
import useMutationData from "./use-mutation-data";
import { useEffect, useRef, useState } from "react";
import {z} from 'zod'; 
import useZodForm from "./use-zod-form";
import { list } from "postcss";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { TRIGGER } from "@/redux/slices/automation";


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
    const {errors,onFormSubmit,register,reset,watch}=useZodForm(promptSchema,mutate);
    // function used to setListener to a specific type
    const onSetListener=(type:'SMARTAI' | 'MESSAGE')=>setListener(type)
    return {onSetListener,register,onFormSubmit,listener,isPending}
}

// hook used to aadd trigger
export const useTriggers = (id: string) => {
    const types = useAppSelector((state) => state.AutmationReducer.trigger?.types)
  
    const dispatch: AppDispatch = useDispatch()
  
    const onSetTrigger = (type: 'COMMENT' | 'DM') =>
      dispatch(TRIGGER({ trigger: { type } }))
  
    const { isPending, mutate } = useMutationData(
      ['add-trigger'],
      (data: { types: string[] }) => saveTrigger(id, data.types),
      'automation-info'
    )
  
    const onSaveTrigger = () => mutate({ types })
    return { types, onSetTrigger, onSaveTrigger, isPending }
  }

  export const useKeywords = (id: string) => {
    const [keyword, setKeyword] = useState('')
    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setKeyword(e.target.value)
//   function to save a keyword name
    const { mutate } = useMutationData(
      ['add-keyword'],
      (data: { keyword: string }) => saveKeyword(id, data.keyword),
      'automation-info',
      () => setKeyword('')
    )
//   the function to save a keyword name will be called when we click on Enter
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        mutate({ keyword })
        setKeyword('')
      }
    }
//   function to delete a word when we call deleteMutation given keyword Id
    const { mutate: deleteMutation } = useMutationData(
      ['delete-keyword'],
      (data: { id: string }) => deleteKeyword(data.id),
      'automation-info'
    )
  
    return { keyword, onValueChange, onKeyPress, deleteMutation }
  }
  