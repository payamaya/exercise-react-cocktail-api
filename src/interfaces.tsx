export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

export interface Drink {
  idDrink: string
  strDrink: string
  strInstructions: string
  strDrinkThumb: string
  strGlass: string
  strCategory: string
  strTags: string | null
  [key: `strIngredient${number}`]: string | undefined
  [key: `strMeasure${number}`]: string | undefined
}
