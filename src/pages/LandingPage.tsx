import { ReactElement, useEffect, useState } from 'react'
import { Button } from '../components'
import { useNavigate } from 'react-router-dom'
import { Drink } from '../interfaces'
import { useDrink } from '../contexts/DrinkContext'

// Define the TypeScript interfaces based on the API response structure
interface ApiResponse {
  drinks: Drink[]
}

export function LandingPage(): ReactElement {
  const { drink, setDrink } = useDrink() // Get drink and setDrink from context
  const [error, setError] = useState<string | null>(null) // State to hold any errors
  const navigate = useNavigate()

  const baseUrl = import.meta.env.VITE_BASE_URL as string

  const fetchDrinks = async () => {
    try {
      const response = await fetch(`${baseUrl}random.php`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: ApiResponse = await response.json()
      setDrink(data.drinks[0]) // Update context with fetched drink data
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  useEffect(() => {
    if (!drink) {
      fetchDrinks() // Fetch data only if there's no drink in context
    }
  }, [drink, baseUrl]) // Only fetch data if drink is not set

  const handleSeeMore = (idDrink: string) => {
    navigate(`/cocktail-info/${idDrink}`)
  }

  return (
    <>
      <section>
        <h1>Welcome to TheCocktailDB</h1>
      </section>
      {error && <p>Error: {error}</p>} {/* Display error if any */}
      {drink && (
        <section className='drink-container'>
          <figure className='info-figure'>
            <img
              className='drink-details-img'
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
            />
            <figcaption className='figcaption'>{drink.strDrink}</figcaption>
          </figure>
          <Button
            type='submit'
            className='btn-submit'
            onClick={() => handleSeeMore(drink.idDrink)}
          >
            See More
          </Button>
        </section>
      )}
      <Button type='button' className='random-btn' onClick={fetchDrinks}>
        Random Drink
      </Button>
    </>
  )
}
