import { ReactElement, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// Define the TypeScript interfaces based on the API response structure
interface Drink {
  idDrink: string
  strDrink: string
  strInstructions: string
  strDrinkThumb: string
  // Define other properties if needed
}

interface ApiResponse {
  drinks: Drink[]
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
      setDrinks(data.drinks) // Set the drinks data
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }
  const apiUrlSearch = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

  const fetchDrinks = async () => {
    try {
      const response = await fetch(apiUrlSearch)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: ApiResponse = await response.json()
      setDrinks(data.drinks) // Set the drinks data
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  useEffect(() => {
    fetchDrinks() // Fetch the data when the component mounts
  }, [])

  const handleSeeMore = (idDrink: string) => {
    navigate(`/cocktail-info/${idDrink}`)
  }
  useEffect(() => {
    fetchSearchDrinks() // Fetch the data when the component mounts
  }, [query])

  return (
    <section className='search-result-container'>
      <h1>Search Results</h1>
      {error && <p>Error: {error}</p>}
      <ul className='search-result-wrapper'>
        {drinks.map((drink) => (
          <li
            className='search-result-card'
            key={drink.idDrink}
            onClick={() => handleSeeMore(drink.idDrink)}
          >
            <h2>{drink.strDrink}</h2>
          </li>
        ))}
      </ul>
    </section>
  )
}
