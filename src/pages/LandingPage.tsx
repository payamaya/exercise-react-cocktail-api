import { ReactElement, useEffect } from 'react'
import { Button } from '../components'
import { useNavigate } from 'react-router-dom'
import { useFetchDrinks } from '../hooks/useFetchDrinks'
import { useDrink } from '../contexts/DrinkContext'

export function LandingPage(): ReactElement {
  const { drink, setDrink } = useDrink() // Get drink and setDrink from context

  const navigate = useNavigate()

  const { data: drinks, error, loading, refetch } = useFetchDrinks(`random.php`)
  useEffect(() => {
    if (!drink) setDrink(drinks[0])
  }, [drink, drinks, setDrink])
  const handleSeeMore = (idDrink: string) => {
    navigate(`/cocktail-info/${idDrink}`)
  }
  const handleRandomClick = () => {
    refetch()
    setDrink(null)
  }
  useEffect(() => {
    if (drinks.length > 0) {
      setDrink(drinks[0]) // Set the newly fetched random drink
    }
  }, [drinks, setDrink])
  return (
    <>
      <section>
        <h1>Welcome to TheCocktailDB</h1>
      </section>
      {loading && <p>Loading...</p>}
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
              onClick={handleRandomClick}
            >
              Random Drink
            </Button>
          </section>
        </section>
      )}
    </>
  )
}
