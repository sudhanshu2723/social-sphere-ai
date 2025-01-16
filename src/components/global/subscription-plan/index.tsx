import { useQueryUser } from "@/hooks/use-queries";



type Props={
    type:'FREE' | 'PRO'
    children:React.ReactNode 
}


export default function SubscriptionPlan({children,type}:Props){
    // hook used to get the profile Info
    const {data}=useQueryUser();
    return (
        // if you are a pro user then only it will render the children
       data?.data?.subscription?.plan===type && children 
    )
}