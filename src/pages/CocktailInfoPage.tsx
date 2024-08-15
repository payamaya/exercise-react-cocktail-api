import { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components'
import { Drink } from '../interfaces'
import { useFetchDrinks } from '../hooks/useFetchDrinks'
import { IngredientPage } from './IngredientPage'

export function CocktailInfoPage(): ReactElement {
  const { id } = useParams<{ id: string }>() // Get the idDrink from the URL params
  const navigate = useNavigate()
  const { data: drinks, error, loading } = useFetchDrinks(`lookup.php?i=${id}`)
  const drink = drinks ? drinks[0] : null

  const renderIngredients = (drink: Drink) => {
    if (!drink) return null

    const ingredients: ReactElement[] = []
    const drinkKeys = Object.keys(drink)
    const ingredientKeys = drinkKeys
      .filter(
        (key) => key.startsWith('strIngredient') && drink[key as keyof Drink] // Check that the key exists in the drink object
      )
      .sort(
        (a, b) =>
          parseInt(a.replace('strIngredient', '')) -
          parseInt(b.replace('strIngredient', ''))
      )

    ingredientKeys.forEach((key) => {
      const index = key.replace('strIngredient', '') // Extract the index number
      const ingredient = drink[key as keyof Drink] as string | undefined
      const measure = drink[`strMeasure${index}` as keyof Drink] as
        | string
        | undefined

      if (ingredient) {
        const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
          ingredient
        )}-Small.png`
        ingredients.push(
          <li
            className='info-list'
            key={key}
            onClick={() => navigate(`/ingredient/${ingredient}`)} // Navigate to IngredientPage
          >
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
    <section>
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
              </section>
              <div className='measure'>
                <span>Ingredients and Measurements</span>
                <ul className='ingredient-item'>{renderIngredients(drink)}</ul>
              </div>
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
          <p>{loading}Loading...</p> // Loading state while data is being fetched
        )}
        {loading && <IngredientPage />}
      </section>
    </section>
  )
}
