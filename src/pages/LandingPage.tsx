import { ReactElement, useEffect, useState } from 'react'
import { Button } from '../components'
import { useNavigate } from 'react-router-dom'
// import { Search } from '../components'

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

export function LandingPage(): ReactElement {
  const [drinks, setDrinks] = useState<Drink[]>([]) // State to hold the drinks data
  const [error, setError] = useState<string | null>(null) // State to hold any errors
  const navigate = useNavigate()

  const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

  const fetchDrinks = async () => {
    try {
      const response = await fetch(apiUrl)
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

  return (
    <>
      {/* <Search /> */}
      <section>
        <h1>Welcome to TheCocktailDB</h1>
      </section>
      {error && <p>Error: {error}</p>} {/* Display error if any */}
      {drinks.map((drink) => (
        <section className='drink-container' key={drink.idDrink}>
          <h2 className='random-drink_card'>{drink.strDrink}</h2>
          <img className='random-img' src={drink.strDrinkThumb} alt='' />
          <Button
            type='submit'
            className='btn-submit'
            onClick={() => handleSeeMore(drink.idDrink)}
          >
            See More
          </Button>
        </section>
      ))}
      <Button type='button' className='random-btn' onClick={fetchDrinks}>
        Random Drink
      </Button>
    </>
  )
}
