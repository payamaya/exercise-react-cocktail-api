import { ReactElement, useEffect, useState } from 'react'
import { Button } from '../components'
import { useNavigate } from 'react-router-dom'
import { Drink } from '../interfaces'
import { useDrink } from '../contexts/DrinkContext'
import { fetchData } from '../utils/fetchData'

// Define the TypeScript interfaces based on the API response structure
interface ApiResponse {
  drinks: Drink[]
}

export function LandingPage(): ReactElement {
  const { drink, setDrink } = useDrink() // Get drink and setDrink from context
  const [error, setError] = useState<string | null>(null) // State to hold any errors
  const navigate = useNavigate()

  useEffect(() => {
    if (!drink) {
      const fetchDrinks = async () => {
        try {
          // Fetch random drink using dynamic fetch function
          const data = await fetchData<ApiResponse>('random.php')
          setDrink(data.drinks[0]) // Update context with fetched drink data
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message)
          } else {
            setError('An unknown error occurred')
          }
        }
      }

      fetchDrinks() // Fetch data only if there's no drink in context
    }
  }, [drink, setDrink])

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
          <section className='landing-btn-section'>
            <Button
              type='submit'
              className='btn-submit'
              onClick={() => handleSeeMore(drink.idDrink)}
            >
              See More
            </Button>
            <Button
              type='button'
              className='random-btn'
              onClick={() => setDrink(null)}
            >
              Random Drink
            </Button>
          </section>
        </section>
      )}
    </>
  )
}
