import { ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Pagination } from '../components'
import usePaginatedDrinks from '../hooks/usePaginatedDrinks'
import { useFetchDrinks } from '../hooks/useFetchDrinks'

export function IngredientPage(): ReactElement {
  const { ingredient } = useParams<{ ingredient: string }>()
  const navigate = useNavigate()
  const {
    data: drinks,
    error,
    loading,
  } = useFetchDrinks(`filter.php?i=${ingredient}`)

  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePaginatedDrinks(`filter.php?i=${ingredient}`, 10)

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
      {drinks.length > 0 && (
        <>
          <section className='drink-wrapper'>
            <ul>
              {currentItems.map((drink) => (
                <li
                  className='drink-container view'
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
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
      <section className='landing-btn-section'>
        <Button className='ingredient-back' onClick={() => navigate(-1)}>
          Back
        </Button>
      </section>
    </>
  )
}
