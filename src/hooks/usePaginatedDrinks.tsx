import { useMemo, useState } from 'react'
import { useFetchDrinks } from './useFetchDrinks'

export default function usePaginatedDrinks(
  endpoint: string,
  itemsPerPage = 10
) {
  const { data: drinks = [], error, loading } = useFetchDrinks(endpoint)
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate total pages
  const totalPages = useMemo(
    () => Math.ceil(drinks.length / itemsPerPage),
    [drinks.length, itemsPerPage]
  )

  // Get current items based on pagination
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return drinks.slice(indexOfFirstItem, indexOfLastItem)
  }, [currentPage, drinks, itemsPerPage])

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  return {
    drinks,
    error,
    loading,
    currentPage,
    setCurrentPage,
    currentItems,
    handlePageChange,
    totalPages,
  }
}
