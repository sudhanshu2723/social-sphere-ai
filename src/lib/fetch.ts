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