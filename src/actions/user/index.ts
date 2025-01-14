"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import findUser, { createUser } from "./queries";
import { refreshToken } from "@/lib/fetch";
import updateIntegration from "../integrations/queries";

// if user existes then return the user otherwise redirect to '/ sign-in' route
export  async function onCurrentUser(){
        const user=await currentUser();
        if(!user)return redirect('/sign-in');
        return user;
}


export  async function onBoardUser(){
    const user=await onCurrentUser();
    try{
        const found=await findUser(user.id);
    
        // we are looking towards Integrations b/c insta token will refresh after 
        // certain span of time
        // so we have to refresh the token
        if(found){
            if(found.integrations.length >0){
                const today=new Date();
                const time_left=found.integrations[0].expiresAt?.getTime()!-today.getTime();
                const days=Math.round(time_left/(1000*3600*24))
                if(days<5){
                    console.log('refresh token')
                    // get the new token
                    const refresh=await refreshToken(found.integrations[0].token);
                    // update the token along with expiration time in db
                    const today=new Date();
                    const expire_date=today.setDate(today.getDate()+60);
                    // function to update token
                    const update_token=await updateIntegration(refresh.access_token,new Date(expire_date),found.integrations[0].id);
                    if(!update_token){
                        console.log('Update Token Failed');
                    }
                }
            }
            return {status:200,
                data:{
                firstname:found.firstname,
                lastname:found.lastname
                }}
        }
        //if the user is entered for the firstTime put its entry in the db
        const created=await createUser(user.id,user.firstName!,user.lastName!,user.emailAddresses[0].emailAddress!);
        return {status:201,data:created};

    }
    catch(err){
        console.log("The error during onBoarding the user is"+err);
        return {status:500}
    }
}

// function used to return users Info along with subscription details
export async function onUserInfo(){
    const user=await onCurrentUser()
    try{
        const profile=await findUser(user.id);
        if(profile)return {status:200,data:profile}
        return {status:404}
    }
    catch(err){
        return {status:500}
    }
}