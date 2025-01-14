import { MutationFunction, MutationKey, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


// wrapper around useMutation
export default function useMutationData(
    mutationKey:MutationKey,
    mutationFn:MutationFunction<any,any>,
    queryKey?:string,
    onSuccess?: ()=>void 
){
    const client=useQueryClient();
    const {mutate,isPending}=useMutation({
        mutationKey,
        mutationFn,
        onSuccess:(data)=>{
            if(onSuccess)onSuccess()
            return toast(data?.status===200 ? 'Success' : 'Error',{
        description:data.data})
        },
        // The onSettled option in the useMutation hook is a lifecycle callback that runs after a mutation finishes, regardless of whether it succeeds or fails.
        // Calls client.invalidateQueries() with the specified queryKey, ensuring that any stale data associated with this key is refetched.
        // This ensures that the UI reflects the latest state of the data after the mutation, whether it succeeded or failed.
        onSettled:async()=>{
            return await client.invalidateQueries({queryKey:[queryKey]})
        }
    })
    return {mutate,isPending}
}


// function used to return the latest variable creating 
// an optimistic view
export function useMutationDataState(mutationKey:MutationKey){
     // selecting latestVariable only for specific mutationKey
    const data=useMutationState({
        filters:{mutationKey},
        select:(mutation)=>{
           return {
            variables:mutation.state.variables as any,
            status:mutation.state.status
           }
        }
    })
   
    // creating the latest variable
    const latestVariable=data[data.length-1]
    return {latestVariable}
}
