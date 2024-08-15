import { useState, useEffect, useCallback } from 'react'
import { fetchData } from '../utils/fetchData'
import { Drink } from '../interfaces'

interface ApiResponse {
  drinks: Drink[]
}

export function useFetchDrinks(endpoint: string) {
  const [data, setData] = useState<Drink[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchDrinks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetchData<ApiResponse>(endpoint)
      setData(response.drinks)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchDrinks()
  }, [fetchDrinks])

  return { data, error, loading, refetch: fetchDrinks }
}
