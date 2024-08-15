import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchDrinks } from '../hooks/useFetchDrinks'
import { Button } from '../components'
import { useNavigate } from 'react-router-dom'

export function IngredientPage(): ReactElement {
  const { ingredient } = useParams<{ ingredient: string }>() // Get the ingredient from the URL
  const {
    data: drinks,
    error,
    loading,
  } = useFetchDrinks(`filter.php?i=${ingredient}`)
  const navigate = useNavigate()

  function handleSeeMore(idDrink: string): void {
    navigate(`/cocktail-info/${idDrink}`)
  }

  return (
    <>
      <section>
        <h1>Drinks with {ingredient}</h1>
      </section>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {drinks && (
        <section className='drink-wrapper'>
          <ul>
            {drinks.map((drink) => (
              <li
                className='drink-container'
                key={drink.idDrink}
                onClick={() => handleSeeMore(drink.idDrink)}
              >
                <figure className='info-figure'>
                  <img
                    className='drink-details-img'
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                  />
                  <figcaption className='figcaption'>
                    {drink.strDrink}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className='landing-btn-section'>
        <Button className='ingredient-back' onClick={() => navigate(-1)}>
          Back
        </Button>
      </section>
    </>
  )
}
