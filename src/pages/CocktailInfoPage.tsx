import { ReactElement, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components'

// Define the TypeScript interface for the drink data
interface Drink {
  idDrink: string
  strDrink: string
  strInstructions: string
  strDrinkThumb: string
  // Add other properties if needed
}

interface ApiResponse {
  drinks: Drink[]
}

export function CocktailInfoPage(): ReactElement {
  const { id } = useParams<{ id: string }>() // Get the idDrink from the URL params
  const [drink, setDrink] = useState<Drink | null>(null) // State to hold the drink data
  const [error, setError] = useState<string | null>(null) // State to hold any errors
  const navigate = useNavigate()

  const lookUpApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`

  useEffect(() => {
    const fetchDrinkById = async () => {
      try {
        const response = await fetch(lookUpApiUrl)
        if (!response.ok) {
          throw new Error('Cannot fetch data from the API by ID')
        }
        const data: ApiResponse = await response.json()
        setDrink(data.drinks[0]) // Set the drink data
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
      }
    }

    fetchDrinkById() // Fetch the drink details when the component mounts
  }, [id]) // Dependency array ensures this runs when the id changes

  return (
    <section className='info-card-container'>
      {error && <p>Error: {error}</p>} {/* Display error if any */}
      {drink ? (
        <section className='drink-details'>
          <div className='drink-info'>
            <h2>{drink.strDrink}</h2>
            <p>{drink.strInstructions}</p>
            <Button className='back' onClick={() => navigate('/')}>
              Back
            </Button>
          </div>
          <img
            className='drink-details-img'
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
          />
        </section>
      ) : (
        <p>Loading...</p> // Loading state while data is being fetched
      )}
    </section>
  )
}
