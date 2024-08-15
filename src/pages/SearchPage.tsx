// SearchPage.tsx
import { ReactElement, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from '../components'
import { PaginationListPage } from './PaginationListPage'
import { Drink } from '../interfaces'
import { fetchData } from '../utils/fetchData'

interface ApiResponse {
  drinks: Drink[] | null
}

export function SearchPage(): ReactElement {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const query = searchParams.get('query') || ''

  useEffect(() => {
    if (!query) {
      setDrinks([])
      return
    }
    const fetchSearchDrinks = async () => {
      try {
        // Fetch random drink using dynamic fetch function
        const data = await fetchData<ApiResponse>('search.php', { s: query })

        if (data.drinks) {
          setDrinks(data.drinks)
          setCurrentPage(1) // Reset to first page when new data is fetched
        } else {
          setDrinks([]) // Handle case where no drinks are found
        } // Update context with fetched drink data
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
      }
    }
    fetchSearchDrinks() // Fetch data only if there's no drink in context
  }, [query]) // Only re-run if query changes

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
