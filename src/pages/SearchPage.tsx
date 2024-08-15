import { ReactElement, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from '../components'
import { PaginationListPage } from './PaginationListPage'
import { Drink } from '../interfaces'
import { fetchData } from '../utils/fetchData'
import usePaginatedDrinks from '../hooks/usePaginatedDrinks'

interface ApiResponse {
  drinks: Drink[] | null
}

export function SearchPage(): ReactElement {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''

  useEffect(() => {
    const fetchSearchDrinks = async () => {
      if (!query) {
        setDrinks([])
        return
      }

      try {
        const data = await fetchData<ApiResponse>(`search.php?s=${query}`)

        if (data.drinks) {
          setDrinks(data.drinks)
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

    fetchSearchDrinks()
  }, [query])

  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePaginatedDrinks(drinks, 10)

  return (
    <>
      <Search />
      {error && <p>Error: {error}</p>}
      {drinks.length > 0 ? (
        <PaginationListPage
          drinks={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : (
        <p className='search-para'>
          Please enter a search query to find a cocktail.
        </p>
      )}
    </>
  )
}
