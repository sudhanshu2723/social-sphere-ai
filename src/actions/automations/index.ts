'use server'

import { onCurrentUser } from "../user"
import findUser from "../user/queries";
import { addKeyWord, addListener, addPost, addTrigger, createAutomation, deleteKeywordQuery, findAutomation, getAutomations, updateAutomation } from "./queries";


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
// function to added a new trigger given the trigger and the automationId
export async function saveTrigger(automationId:string,trigger:string[]){
        await onCurrentUser();
        try{
            const create=await addTrigger(automationId,trigger);
            if(create)return {status:200,data:'Trigger Saved'}
            return {status:404,data:'Cannot Save Trigger'}

        }catch(err){
            return {status:500}
        }

}

// function to add a keyword to the db
export const saveKeyword = async (automationId: string, keyword: string) => {
    await onCurrentUser()
    try {
      const create = await addKeyWord(automationId, keyword)
  
      if (create) return { status: 200, data: 'Keyword added successfully' }
  
      return { status: 404, data: 'Cannot add this keyword' }
    } catch (error) {
      return { status: 500, data: 'Oops! something went wrong' }
    }
  }


//   function to delete a keyword given its id
export const deleteKeyword = async (id: string) => {
    await onCurrentUser()
    try {
      const deleted = await deleteKeywordQuery(id)
      if (deleted)
        return {
          status: 200,
          data: 'Keyword deleted',
        }
      return { status: 404, data: 'Keyword not found' }
    } catch (error) {
      return { status: 500, data: 'Oops! something went wrong' }
    }
  }

  export const getProfilePosts = async () => {
    const user = await onCurrentUser()
    try {
      const profile = await findUser(user.id)
      const posts = await fetch(
        `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
      )
      const parsed = await posts.json()
      if (parsed) return { status: 200, data: parsed }
      console.log('🔴 Error in getting posts')
      return { status: 404 }
    } catch (error) {
      console.log('🔴 server side Error in getting posts ', error)
      return { status: 500 }
    }
  }

//   function to add a new post given the automationId
  export const savePosts = async (
    autmationId: string,
    posts: {
      postid: string
      caption?: string
      media: string
      mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
    }[]
  ) => {
    await onCurrentUser()
    try {
      const create = await addPost(autmationId, posts)
  
      if (create) return { status: 200, data: 'Posts attached' }
  
      return { status: 404, data: 'Automation not found' }
    } catch (error) {
      return { status: 500, data: 'Oops! something went wrong' }
    }
  }

// function used to add a new automation to the db
  export const activateAutomation = async (id: string, state: boolean) => {
    await onCurrentUser()
    try {
      const update = await updateAutomation(id, { active: state })
      if (update)
        return {
          status: 200,
          data: `Automation ${state ? 'activated' : 'disabled'}`,
        }
      return { status: 404, data: 'Automation not found' }
    } catch (error) {
      return { status: 500, data: 'Oops! something went wrong' }
    }
  }
  