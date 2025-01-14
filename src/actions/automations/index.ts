'use server'

import { onCurrentUser } from "../user"
import { addListener, createAutomation, findAutomation, getAutomations, updateAutomation } from "./queries";


// function used to create new Automations
export async function createAutomations(id?:string){
    const user=await onCurrentUser();
    try{
        const create=await createAutomation(user.id,id);
        if(create)return {status:200,data:'Automation Created'}
        return {status:404,data:'Something went wrong in creating Automations'}
    }catch(err){
        return {status:500,data:'Internal Server Error'}
    }
}

// function used to get all automations
export async function getAllAutomations() {
    const user=await onCurrentUser();
    try{
        const automations=await getAutomations(user.id);
        if(automations){
            return {
                status:200,
                data:automations.automations
            }
        }
        return {status:404, data: []}
    }catch(err){
        return {status:500, data: []}
    }
    
}


// function to find all the info related to automations
export async function getAutomationInfo(id:string){
    await onCurrentUser();
    try{
        const automation=await findAutomation(id);
        if(automation)return {status:200,data:automation}
        return {status:404}

    }catch(err){
        return {status:500}
    }
}

// function used to update the automation name
export async function updateAutomatioName(automationId:string,data:{
    name?:string
    active?:boolean
    automation?:boolean
}){
    await onCurrentUser();
    try{
        const update=await updateAutomation(automationId,data);
        if(update){
            return {status:200,data:'Automation Successfully Updated'}
        }
        return {status:404,data:'Cannot find Automation'}
    }
    catch(err){
        return {status:500, data:'Error occured in Updating the automation'}
    }
}


export async function saveListener(automationId:string,listener:'SMARTAI' | 'MESSAGE',prompt:string,reply?:string) {
    await onCurrentUser();
    try{
        // function to create a new listener in the db
        const create=await addListener(automationId,listener,prompt,reply);
        if(create) return {status:200,data:'Listener created'}
        return {status:404,data:'Cannot Save Listener'};
    }catch(err){
        return {status:500,data:"Some error have occured in creating listener"}
    }
    
}