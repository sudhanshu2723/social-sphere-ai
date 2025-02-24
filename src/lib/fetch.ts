
import axios from 'axios'

// The refreshToken function refreshes an Instagram access token to extend its validity
// Receives the refreshed token details from Instagram's API.
// Returns the response data, which typically contains the new access token and its updated expiration time.
// This function helps ensure continuous access to Instagram API by keeping the token valid.
export const refreshToken = async (token: string) => {
    const refresh_token = await axios.get(
      `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    )
  
    return refresh_token.data
  }
// function to send dm to the user
  export const sendDM = async (
    userId: string,
    recieverId: string,
    prompt: string,
    token: string
  ) => {
    console.log('sending message')
    return await axios.post(
      `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
      {
        recipient: {
          id: recieverId,
        },
        message: {
          text: prompt,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }
  
  export const sendPrivateMessage = async (
    userId: string,
    recieverId: string,
    prompt: string,
    token: string
  ) => {
    console.log('sending message')
    return await axios.post(
      `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
      {
        recipient: {
          comment_id: recieverId,
        },
        message: {
          text: prompt,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }
  
  
  export const generateTokens = async (code: string) => {
    console.log("generating tokens")
    try{

      const insta_form = new FormData()
      insta_form.append('client_id', process.env.INSTAGRAM_CLIENT_ID as string)
      insta_form.append('client_secret',process.env.INSTAGRAM_CLIENT_SECRET as string)
      insta_form.append('grant_type', 'authorization_code')
      insta_form.append('redirect_uri',`${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`)
      insta_form.append('code', code)
    console.log("generating tokens")
      const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
        method: 'POST',
        body: insta_form,
      })
      console.log("shorttoken is "+shortTokenRes)
    
      const token = await shortTokenRes.json()
      console.log("token is "+token.permissions)
      if (token  && token.permissions && token.permissions.length > 0) {
        
        console.log(token, 'got permissions')
        console.log(`${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`);
        const long_token = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
        )
        console.log("the data of lon_token is"+long_token.data)
        return long_token.data
    }
    console.log("token generated")
    console.log("the token is "+token.access_token)
    }
    catch(err){
      
      console.log("the error in token is "+err)
    }
  }
  