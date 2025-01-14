"use server"

import { client } from "@/lib/prisma"

// function to update the token
export default async function updateIntegration(token:string,expire:Date,id:string){
    const updatedToken=await client.integrations.update({
        where:{
            id:id 
        },
        data:{
            token,
            expiresAt:expire 
        }
    })
    return updatedToken;
}