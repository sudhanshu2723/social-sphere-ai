import { onIntegrate } from '@/actions/integrations'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  searchParams: {
    code: string
  }
}

const Page = async ({ searchParams: { code } }: Props) => {
  if (code) {
    console.log("code is")
    console.log(code.split('#_')[0])
    // hook used to integrate user to insta
    const user = await onIntegrate(code.split('#_')[0])
    if (user.status === 200) {
      return redirect(
        `/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`
      )
    }
  }
  console.log("this is no code")
  return redirect('/sign-up')
}

export default Page
