import { ReactElement, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from './Button'
import { PaginationList } from './PaginationList'

// Define the TypeScript interfaces based on the API response structure
interface Drink {
  idDrink: string
  strDrink: string
  strInstructions: string
  strDrinkThumb: string
}

interface ApiResponse {
  drinks: Drink[] | null
}

export function SearchResullts(): ReactElement {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('query') || ''

  const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`

  const fetchSearchDrinks = async () => {
    try {
      const response = await fetch(`${apiUrl}${query}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: ApiResponse = await response.json()
      if (data.drinks) {
        setDrinks(data.drinks)
      } else {
        setDrinks([]) // Set the drinks data
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }
  useEffect(() => {
    fetchSearchDrinks() // Fetch the data when the component mounts
  }, [query])

  return (
    <>
      {/* <h1 className='search-title'>Search Results</h1> */}
      <Button
        onClick={() => navigate(-1)}
        type='button'
        className='search-result-back'
      >
        Back
      </Button>
      <section className='search-result-container'>
        {error && <p>Error: {error}</p>}
        <ul className='search-result-wrapper'>
          {drinks.length > 0 ? (
            <PaginationList drinks={drinks} />
          ) : (
            <p>No Results found for "{query}"</p>
          )}
        </ul>
      </section>
    </>
  )
}
