'use server'

import { redirect } from 'next/navigation'
import { onCurrentUser } from '../user'
import { createIntegration, getIntegration } from './queries'
import { generateTokens } from '@/lib/fetch'
import axios from 'axios'

export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
  if (strategy === 'INSTAGRAM') {
    return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
  }
}

export const onIntegrate = async (code: string) => {
  const user = await onCurrentUser()

  try {
    const integration = await getIntegration(user.id)

    if (integration && integration.integrations.length === 0) {
      const token = await generateTokens(code)
      console.log(token)

      if (token) {
        const insta_id = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
        )

        const today = new Date()
        const expire_date = today.setDate(today.getDate() + 60)
        const create = await createIntegration(
          user.id,
          token.access_token,
          new Date(expire_date),
          insta_id.data.user_id
        )
        return { status: 200, data: create }
      }
      console.log('🔴 401')
      return { status: 401 }
    }
    console.log('🔴 404')
    return { status: 404 }
  } catch (error) {
    console.log('🔴 500', error)
    return { status: 500 }
  }
}

// 'use server' 

// import { redirect } from 'next/navigation' 
// import { onCurrentUser } from '../user'
// import { createIntegration, getIntegration } from './queries'
// import { generateTokens } from '@/lib/fetch' 
// import axios from 'axios' 

// // Function to handle Instagram or CRM OAuth
// export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
//     // If the strategy is 'INSTAGRAM', redirect the user to the Instagram OAuth URL
//     if (strategy === 'INSTAGRAM') {
//         return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
//     }
// }

// // Function to integrate Instagram account after OAuth process
// export const onIntegrate = async (code: string) => {
//     // Retrieves the currently logged-in user
//     const user = await onCurrentUser()
//     console.log("integrating to instagram")
//     try {
//         // Checks if the user already has integrations
//         const integration = await getIntegration(user.id)

//         // If no integrations exist for the user, proceed with the integration
//         if (integration && integration.integrations.length === 0) {
//             // Generates tokens using the OAuth code
//             const token = await generateTokens(code)
//             console.log(token)

//             // If the token is successfully generated
//             if (token) {
//                 // Retrieves the Instagram user ID using the generated access token
//                 const insta_id = await axios.get(
//                     `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
//                 )

//                 // Calculates the token expiry date (60 days from today)
//                 const today = new Date()
//                 const expire_date = today.setDate(today.getDate() + 60)

//                 // Creates a new integration record in the database
//                 const create = await createIntegration(
//                     user.id,
//                     token.access_token,
//                     new Date(expire_date),
//                     insta_id.data.user_id
//                 )

//                 // Returns a success response with the created integration data
//                 return { status: 200, data: create }
//             }

//             // Logs and returns a 401 status if token generation failed
//             console.log('🔴 401')
//             return { status: 401 }
//         }

//         // Logs and returns a 404 status if the user already has integrations
//         console.log('🔴 404')
//         return { status: 404 }
//     } catch (error) {
//         // Logs and returns a 500 status for any unexpected errors
//         console.log('🔴 500', error)
//         return { status: 500 }
//     }
// }
