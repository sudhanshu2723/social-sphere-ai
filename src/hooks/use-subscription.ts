import axios from 'axios'
import { useState } from 'react'

export const useSubscription = () => {
    // processing state is true when payment is processing
  const [isProcessing, setIsProcessing] = useState(false)
//   if payment is successful : redirect to "/success" : else redirect to "/failure"
//  we will get the response from '/api/payment' regarding the status of payment
  const onSubscribe = async () => {
    setIsProcessing(true);
    const response = await axios.get('/api/payment')
    if (response.data.status === 200) {
      return (window.location.href = `${response.data.session_url}`)
    }

    setIsProcessing(false)
  }

  return { onSubscribe, isProcessing }
}
