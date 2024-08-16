import { ReactElement, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useFetchDrinks } from '../hooks/useFetchDrinks'
import { Button } from './Button'

export default function BrowserByName(): ReactElement {
  const { letter } = useParams<{ letter: string }>() // Get the letter from the URL
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') || letter || '' // Use query or letter from URL
  const navigate = useNavigate()

  const {
    data: drinks,
    error,
    loading,
    refetch,
  } = useFetchDrinks(query ? `search.php?f=${query}` : null)

  useEffect(() => {
    if (query) {
      refetch()
    }
  }, [query, refetch])

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  )

  const handleClick = (selectedLetter: string) => {
    // Navigate to the specific letter's page
    setSearchParams({ query: selectedLetter.toLowerCase() })
    navigate(`/browse/letter/${selectedLetter}`)
  }

  const handleSeeMore = (idDrink: string) => {
    navigate(`/cocktail-info/${idDrink}`)
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {drinks && (
        <section className='drink-wrapper '>
          <ul>
            {drinks.map((drink) => (
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
      )}
      <section>
        <h1>Browse By Name</h1>
        <div className='alphabet-list'>
          {alphabet.map((letter) => (
            <Button
              className='alphabet-btn'
              key={letter}
              onClick={() => handleClick(letter)}
            >
              {letter}
            </Button>
          ))}
        </div>
      </section>
    </>
  )
}
