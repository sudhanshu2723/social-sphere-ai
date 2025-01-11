import React from 'react'
import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs'
import { User } from 'lucide-react'
import Loader from '../loader'
import { Button } from '@/components/ui/button'




export default function ClerkAuthState(){
    return (
        <>
        {/* The <ClerkLoading> renders its children while Clerk is loading, 
        and is helpful for showing a custom loading state. */}
         <ClerkLoading>
        <Loader state>
          <></>
        </Loader>
      </ClerkLoading>
{/* When the user is signed out show him a signin button */}
      <SignedOut>
        <SignInButton>
          <Button
            className="rounded-xl 
          bg-[#252525] 
          text-white 
          hover:bg-[#252525]/70
          "
          >
            <User />
            Login
          </Button>
        </SignInButton>
      </SignedOut>
{/* When the user is signed in then him his details after clicking on the user button */}
      <SignedIn>
        <UserButton>
          <UserButton.UserProfileLink
            label="Dashboard"
            url={`/dashboard`}
            labelIcon={<User size={16} />}
          />
        </UserButton>
      </SignedIn>
        </>
    )
}