'use server'

import { client } from "@/lib/prisma"

// function returns user's subscription details and
// A selection of fields (id, token, expiresAt, and name) 
// from the user's integrations given the user ClerkId
export default async function findUser(clerkId:string){
   try{
    const userDetails=await client.user.findUnique({
        where:{
            clerkId:clerkId
        },
        include:{
            subscription:true,
            integrations:{
                select:{
                    id:true,
                    token:true,
                    expiresAt:true, 
                    name:true 

                }
            }
        }
    })
    return userDetails;
   }
   catch(err){
    console.log("the error is"+err)
   }
}

// function to create new user->returns the firstName and lastName
export async function createUser(clerkId:string,firstname:string,lastname:string,email:string){
    const newUser=await client.user.create({
        data:{
            clerkId,
            firstname,
            lastname,
            email,
            subscription:{
                create:{}
            }
        },
        select:{
            firstname:true, 
            lastname:true 
        }
    })
    return newUser;
} 