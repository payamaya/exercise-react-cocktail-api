import { Pagination } from '../components/Pagination'
import { useNavigate } from 'react-router-dom'
import { Drink } from '../interfaces'
import { ReactElement } from 'react'

interface Props {
  drinks: Drink[]
  currentPage: number
  totalPages: number
  handlePageChange: (pageNumber: number) => void
}

export function PaginationListPage({
  drinks,
  currentPage,
  totalPages,
  handlePageChange,
}: Props): ReactElement {
  const navigate = useNavigate()

  const handleSeeMore = (idDrink: string) => {
    navigate(`/cocktail-info/${idDrink}`)
  }

  return (
    <>
      <section className='search-result-container'>
        <h1 className='pagination-list-header'>Cocktail List</h1>
        <ul className='search-result-wrapper'>
          {drinks.map((drink) => (
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
