import { ReactElement, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components'
import { Drink } from '../interfaces'

interface ApiResponse {
  drinks: Drink[]
}

export function CocktailInfoPage(): ReactElement {
  const { id } = useParams<{ id: string }>() // Get the idDrink from the URL params
  const [drink, setDrink] = useState<Drink | null>(null) // State to hold the drink data
  const [error, setError] = useState<string | null>(null) // State to hold any errors

  const navigate = useNavigate()

  // const lookUpApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  const baseUrl = import.meta.env.VITE_BASE_URL as string
  useEffect(() => {
    const fetchDrinkById = async () => {
      try {
        const response = await fetch(`${baseUrl}lookup.php?i=${id}`)
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
  }, [id, baseUrl]) // Dependency array ensures this runs when the id changes

  const renderIngredients = () => {
    if (!drink) return null

    const ingredients: ReactElement[] = []

    // Get all keys from the drink object
    const drinkKeys = Object.keys(drink)

    // Filter and sort keys for ingredients and measures
    const ingredientKeys = drinkKeys
      .filter(
        (key) => key.startsWith('strIngredient') && drink[key as keyof Drink]
      )
      .sort(
        (a, b) =>
          parseInt(a.replace('strIngredient', '')) -
          parseInt(b.replace('strIngredient', ''))
      )

    ingredientKeys.forEach((key) => {
      const index = key.replace('strIngredient', '') // Extract the index number
      const ingredient = drink[key as keyof Drink]
      const measure = drink[`strMeasure${index}` as keyof Drink]

      if (ingredient) {
        const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
          ingredient
        )}-Small.png`
        ingredients.push(
          <li className='info-list' key={key}>
            <img src={imageUrl} alt={ingredient} className='ingredient-image' />
            {measure ? `${measure} ` : ''}
            {ingredient}
          </li>
        )
      }
    })

    return ingredients
  }
  return (
    <section className='info-card-container'>
      {error && <p>Error: {error}</p>} {/* Display error if any */}
      {drink ? (
        <section className='drink-details'>
          <div className='drink-info'>
            <section className='info-details-section'>
              <table className='info-table'>
                <tbody>
                  <tr>
                    <th>Instructions:</th>
                    <td>{drink.strInstructions}</td>
                  </tr>
                  {drink.strTags && (
                    <tr>
                      <th>Tags:</th>
                      <td>{drink.strTags}</td>
                    </tr>
                  )}
                  <tr>
                    <th>Category:</th>
                    <td>{drink.strCategory}</td>
                  </tr>
                  <tr>
                    <th>Glass:</th>
                    <td>{drink.strGlass}</td>
                  </tr>
                </tbody>
              </table>
              {/* <img src={drink.strDrinkThumb} alt={drink.strDrink} /> */}
            </section>

            <div className='measure'>
              <span>Ingredients and Measurements</span>
              <ul className='ingredient-item'>{renderIngredients()}</ul>
            </div>
            {/* <div className='info-glass'>
              <span>Glass:</span>
              <p>{drink.strGlass}</p>
            </div> */}
            <Button className='back' onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
          <figure className='info-figure'>
            <img
              className='drink-details-img'
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
            />
            <figcaption className='figcaption'>{drink.strDrink}</figcaption>
          </figure>
        </section>
      ) : (
        <p>Loading...</p> // Loading state while data is being fetched
      )}
    </section>
  )
}
