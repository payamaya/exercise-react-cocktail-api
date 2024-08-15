import { useMemo, useState } from 'react'
import { Drink } from '../interfaces'

export default function usePaginatedDrinks(drinks: Drink[], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(drinks.length / itemsPerPage)
  }, [drinks, itemsPerPage])

  // Get current items based on pagination
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return drinks.slice(indexOfFirstItem, indexOfLastItem)
  }, [currentPage, drinks, itemsPerPage])

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return {
    currentItems,
    currentPage,
    totalPages,
    handlePageChange,
  }
}
