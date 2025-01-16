'use server'

import { client } from "@/lib/prisma"
import { v4 } from "uuid"

// function used to create new Automations
export async function createAutomation(clerkId:string,id?:string){
    const automations=await client.user.update({
        where:{
            clerkId 
        },
        data:{
            automations:{
                create:{
                    ...(id && {id})
                }
            }
        }
    })
    return automations
}
 
export async function getAutomations(clerkId:string){
    const allAutomations=await client.user.findUnique({
        where:{
            clerkId
        },
        select:{
            automations:{
                orderBy:{
                    createdAt:'asc'
                },
                include:{
                    keywords:true,
                    listener:true 
                }
            }
        }
    })
    return allAutomations
}


export async function findAutomation(id:string){
    const automation=await client.automation.findUnique({
        where:{
            id
        },
        include:{
            keywords:true,
            trigger:true,
            posts:true,
            listener:true 
        }
    })
    return automation
}


export async function updateAutomation(id:string,
    update:{
        name?:string 
        active?:boolean
    }
){
    const data=await client.automation.update({
        where:{id},
        data:{
            name:update.name,
            active:update.active
        }
    })
    return data;
}
// function to create a new listener in the db
export async function addListener(automationId:string,listener:'SMARTAI' | 'MESSAGE',prompt:string,reply?:string){
const listenerTrigger=await client.automation.update({
    where:{
        id:automationId 
    },
    data:{
        listener:{
            create:{
                listener,
                prompt,
                commentReply:reply 
            }
        }
    }
})
return listenerTrigger; 
}

export const addTrigger = async (automationId: string, trigger: string[]) => {
    if (trigger.length === 2) {
      return await client.automation.update({
        where: { id: automationId },
        data: {
          trigger: {
            createMany: {
              data: [{ type: trigger[0] }, { type: trigger[1] }],
            },
          },
        },
      })
    }
    return await client.automation.update({
      where: {
        id: automationId,
      },
      data: {
        trigger: {
          create: {
            type: trigger[0],
          },
        },
      },
    })
  }



  export const addKeyWord = async (automationId: string, keyword: string) => {
    return client.automation.update({
      where: {
        id: automationId,
      },
      data: {
        keywords: {
          create: {
            word: keyword,
          },
        },
      },
    })
  }

  export const deleteKeywordQuery = async (id: string) => {
    return client.keyword.delete({
      where: { id },
    })
  }