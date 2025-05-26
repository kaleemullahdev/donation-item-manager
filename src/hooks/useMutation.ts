import { useState } from 'react'

export const useMutation = <T, V>(
  mutationFn: (variables: V) => Promise<T>,
  options: {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
  } = {}
) => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const mutate = async (variables: V) => {
    setIsPending(true)
    setError(null)
    try {
      const result = await mutationFn(variables)
      options.onSuccess?.(result)
      return result
    } catch (err) {
      const error = err as Error
      setError(error)
      options.onError?.(error)
      throw error
    } finally {
      setIsPending(false)
    }
  }

  return { mutate, isPending, error }
}
