// SearchPage.tsx
import { ReactElement, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from '../components'
import { PaginationListPage } from './PaginationListPage'
import { Drink } from '../interfaces'

interface ApiResponse {
  drinks: Drink[] | null
  process: NodeJS.Process
}

export function SearchPage(): ReactElement {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const query = searchParams.get('query') || ''

  // const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
  // Use the base URL from environment variables
  const baseUrl = import.meta.env.VITE_BASE_URL as string

  useEffect(() => {
    if (!query) {
      setDrinks([])
      return
    }

    const fetchSearchDrinks = async () => {
      try {
        const response = await fetch(`${baseUrl}search.php?s=${query}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data: ApiResponse = await response.json()
        if (data.drinks) {
          setDrinks(data.drinks)
          setCurrentPage(1) // Reset to first page when new data is fetched
        } else {
          setDrinks([]) // Handle case where no drinks are found
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
      }
    }

    fetchSearchDrinks() // Call the function when the component mounts
  }, [baseUrl, query]) // Only re-run if query changes

  return (
    <>
      <Search />
      {error && <p>Error: {error}</p>}
      {drinks.length > 0 ? (
        <PaginationListPage
          drinks={drinks}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <p className='search-para'>
          Please enter a search query to find a cocktail.
        </p>
      )}
    </>
  )
}
