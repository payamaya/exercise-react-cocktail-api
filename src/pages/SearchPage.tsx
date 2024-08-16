import { ReactElement, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from '../components'
import { PaginationListPage } from './PaginationListPage'
import { useFetchDrinks } from '../hooks/useFetchDrinks'
import usePaginatedDrinks from '../hooks/usePaginatedDrinks'

export function SearchPage(): ReactElement {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''

  const {
    data: drinks,
    error,
    loading,
    refetch,
  } = useFetchDrinks(query ? `search.php?s=${query}` : null)

  useEffect(() => {
    if (query) {
      refetch()
    }
  }, [query, refetch])

  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePaginatedDrinks(query ? `search.php?s=${query}` : '', 10)

  return (
    <>
      <Search />
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      {drinks.length > 0 ? (
        <PaginationListPage
          drinks={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : (
        !loading && (
          <p className='search-para'>
            Please enter a search query to find a cocktail.
          </p>
        )
      )}
    </>
  )
}
