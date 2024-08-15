import { ReactElement, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components'
import { Drink } from '../interfaces'
import { fetchData } from '../utils/fetchData'

interface ApiResponse {
  drinks: Drink[]
}

export function CocktailInfoPage(): ReactElement {
  const { id } = useParams<{ id: string }>() // Get the idDrink from the URL params
  const [drink, setDrink] = useState<Drink | null>(null) // State to hold the drink data
  const [error, setError] = useState<string | null>(null) // State to hold any errors

  const navigate = useNavigate()

  useEffect(() => {
    if (!drink) {
      const fetchDrinkById = async () => {
        try {
          // Fetch random drink using dynamic fetch function
          const data = await fetchData<ApiResponse>(`lookup.php?i=${id}`)
          setDrink(data.drinks[0]) // Update context with fetched drink data
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message)
          } else {
            setError('An unknown error occurred')
          }
        }
      }

      fetchDrinkById() // Fetch data only if there's no drink in context
    }
  }, [id, drink])

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
