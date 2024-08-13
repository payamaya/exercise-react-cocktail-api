import { useState } from 'react'
import { Pagination } from './Pagination'
import { useNavigate } from 'react-router-dom'

// Define the TypeScript interface for the drink data
interface Drink {
  idDrink: string
  strDrink: string
  strInstructions: string
  strDrinkThumb: string
}

interface Props {
  drinks: Drink[]
}
export function PaginationList({ drinks }: Props) {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10

  //Calculate the indices of the current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = drinks.slice(indexOfFirstItem, indexOfLastItem)

  //Calculate the total number of page
  const totalPages =
    drinks.length > 0 ? Math.ceil(drinks.length / itemsPerPage) : 1
  if (!drinks || drinks.length === 0) {
    return <p>No drinks found.</p>
  }
  //Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  // Handle See More Info
  const handleSeeMore = (idDrink: string) => {
    navigate(`/cocktail-info/${idDrink}`)
  }
  return (
    <section className='search-result-container'>
      <h1>Cocktail List</h1>
      <ul className='search-result-wrapper'>
        {currentItems.map((drink) => (
          <li className='search-result-card' key={drink.idDrink}>
            <h2
              className='search-header'
              onClick={() => handleSeeMore(drink.idDrink)}
            >
              {drink.strDrink}
            </h2>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  )
}
