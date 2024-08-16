// import {
//   createContext,
//   ReactElement,
//   ReactNode,
//   useContext,
//   useState,
// } from 'react'
// import { Drink } from '../interfaces'

// interface DrinkContextValue {
//   drink: Drink | null
//   setDrink: (drink: Drink | null) => void
// }

// // Define props for the provider
// interface DrinkProviderProps {
//   children: ReactNode
// }

// export const DrinkContext = createContext<DrinkContextValue | undefined>(
//   undefined
// )
// export function DrinkProvider({ children }: DrinkProviderProps): ReactElement {
//   const [drink, setDrink] = useState<Drink | null>(null)
//   return (
//     <DrinkContext.Provider value={{ drink, setDrink }}>
//       {children}
//     </DrinkContext.Provider>
//   )
// }
// // eslint-disable-next-line react-refresh/only-export-components
// export const useDrink = () => {
//   const context = useContext(DrinkContext)
//   if (!context) {
//     throw new Error('useDrink must be used within a DrinkProvider')
//   }
//   return context
// }
