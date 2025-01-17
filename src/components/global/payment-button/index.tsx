'use client'
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { isPlainObject } from "@reduxjs/toolkit";
import { CreditCardIcon, Loader2 } from "lucide-react";




export default function PaymentButton(){
    // hook used to add subscription 
    const {onSubscribe,isProcessing}=useSubscription();

    return (
        <Button disabled={isProcessing} onClick={onSubscribe} className="bg-gradient-to-br
        text-white 
        rounded-full 
       from-[#6d60a3] 
       via-[#9434E6] 
       font-bold 
       to-[#CC3BD4]"
       >
            {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCardIcon />}
            Upgrade
        </Button>
    )
}