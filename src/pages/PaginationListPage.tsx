// PaginationListPage.tsx
import { Pagination } from '../components/Pagination'
import { useNavigate } from 'react-router-dom'
import { Drink } from '../interfaces'

interface Props {
  drinks: Drink[]
  currentPage: number
  setCurrentPage: (page: number) => void
}

export function PaginationListPage({
  drinks,
  currentPage,
  setCurrentPage,
}: Props) {
  const navigate = useNavigate()
  const itemsPerPage = 10

  // Calculate the indices of the current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = drinks.slice(indexOfFirstItem, indexOfLastItem)

  // Calculate the total number of pages
  const totalPages = Math.ceil(drinks.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle See More Info
  const handleSeeMore = (idDrink: string) => {
    navigate(`/cocktail-info/${idDrink}`)
  }

  return (
    <>
      <section className='search-result-container'>
        <h1 className='pagination-list-header'>Cocktail List</h1>
        <ul className='search-result-wrapper'>
          {currentItems.map((drink) => (
            <li
              className='search-result-card'
              key={drink.idDrink}
              onClick={() => handleSeeMore(drink.idDrink)}
            >
              {drink.strDrink}
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
  )
}
