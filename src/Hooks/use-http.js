import { useCallback, useState } from 'react'

export default function useHttp(reqFn, loading=false) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(loading ? 'pending' : null)
    const [, setError] = useState(null)

    const sendRequest = useCallback(async (reqData) => {
        setIsLoading('pending')
        try {
            const resData = await reqFn(reqData)
            // console.log(resData,909)
            setData(resData)
            setIsLoading('completed')
        } catch (err) {
            setError(err.message || 'something went wrong')
            setIsLoading('completed')
        }
    
    },[reqFn])
    return {
        data,
        isLoading,
        sendRequest
    }
}
