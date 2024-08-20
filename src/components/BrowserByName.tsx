import { ReactElement, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useFetchDrinks } from '../hooks/useFetchDrinks'
import { Button } from './Button'
import { PaginationListPage } from '../pages'
import usePaginatedDrinks from '../hooks/usePaginatedDrinks'

export default function BrowserByName(): ReactElement {
  const { letter } = useParams<{ letter: string }>() // Get the letter from the URL
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') || letter || '' // Use query or letter from URL
  const navigate = useNavigate()

  const {
    data: drinks,
    error,
    loading,
    refetch,
  } = useFetchDrinks(query ? `search.php?f=${query}` : null)

  useEffect(() => {
    if (query) {
      refetch()
    }
  }, [query, refetch])

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  )

  const handleClick = (selectedLetter: string) => {
    // Navigate to the specific letter's page
    setSearchParams({ query: selectedLetter.toLowerCase() })
    navigate(`/browse/letter/${selectedLetter}`)
  }

  // const handleSeeMore = (idDrink: string) => {
  //   navigate(`/cocktail-info/${idDrink}`)
  // }
  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePaginatedDrinks(query ? `search.php?s=${query}` : '', 10)
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {drinks.length > 0 ? (
        <PaginationListPage
          drinks={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : (
        !loading && <p className='search-para'>No Data Found</p>
      )}
      <section>
        <h1>Browse By Name</h1>
        <div className='alphabet-list'>
          {alphabet.map((letter) => (
            <Button
              className='alphabet-btn'
              key={letter}
              onClick={() => handleClick(letter)}
            >
              {letter}
            </Button>
          ))}
        </div>
      </section>
    </>
  )
}
