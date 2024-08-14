import { ChangeEventHandler } from 'react'

// interfaces.ts
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

export interface IInput {
  label?: string
  placeholder?: string
  type: 'text' | 'search'
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  value?: string
  name?: string
  id?: string
  checked?: boolean
  className?: string
}
export interface IPagination {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}
