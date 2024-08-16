import { ReactElement, useEffect, useState } from 'react'
import { Button } from '../components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFetchDrinks } from '../hooks/useFetchDrinks'
import { Drink } from '../interfaces'
import BrowserByName from '../components/BrowserByName'

export function BrowseByNamePage(): ReactElement {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const [drink, setDrink] = useState<Drink | null>(null)
  const navigate = useNavigate()

  const {
    data: drinks,
    error,
    loading,
    refetch,
  } = useFetchDrinks(query ? `/search.php?f=${query}` : null)

  useEffect(() => {
    if (drinks && drinks.length > 0) {
      setDrink(drinks[0])
    }
  }, [drinks])

  const handleSeeMore = (idDrink: string) => {
    navigate(`/cocktail-info/${idDrink}`)
  }

  const handleRandomClick = () => {
    refetch()
    setDrink(null)
  }

  return (
    <>
      <section>
        <h1>Search By First Letter Page</h1>
      </section>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
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
      <BrowserByName />
    </>
  )
}
