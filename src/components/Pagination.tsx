import { ReactElement } from 'react'
import { IPagination } from '../interfaces'

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: IPagination): ReactElement {
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
