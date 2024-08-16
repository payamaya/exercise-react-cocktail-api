import { ReactElement } from 'react'
import { IPagination } from '../interfaces'
import { Button } from './Button'

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: IPagination): ReactElement {
  const pageNumbers = []
  const maxPageButtons = 5

  if (totalPages <= maxPageButtons) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, currentPage + 2)

    if (start > 1) {
      pageNumbers.push(1)
      if (start > 2) pageNumbers.push('...')
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pageNumbers.push('...')
      pageNumbers.push(totalPages)
    }
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number, index) => (
          <li key={index} className={number === currentPage ? 'active' : ''}>
            {number === '...' ? (
              <span>...</span>
            ) : (
              <Button onClick={() => onPageChange(number as number)}>
                {number}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
