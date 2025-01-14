import { onBoardUser } from "@/actions/user";
import { redirect } from "next/navigation";



export default async function Page(){
    // server action to onBoard the user
    const user= await onBoardUser(); 
   console.log(user)
    // is the user is successfully logged in (200 status code) or if new user is created (201 status code) redirect the user to '/dashboard/{id}'
    if(user.status===200 || user.status===201){
        return redirect(`dashboard/${user.data?.firstname}${user.data?.lastname}`)
    }
    // In case of some error redirect it to sign-in page
    return redirect('/sign-in');
  
}