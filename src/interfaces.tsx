import { ButtonHTMLAttributes, ReactNode } from 'react'

// interfaces.ts
export interface Drink {
  startsWith(arg0: string): unknown
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
export interface Category {
  strCategory: string
}

export interface IInput extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}
export interface IPagination {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}
