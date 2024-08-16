import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { App } from './components'
import {
  CocktailInfoPage,
  LandingPage,
  SearchPage,
  IngredientPage,
  BrowseByNamePage,
} from './pages'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path='/cocktail-info/:id' element={<CocktailInfoPage />} />
      <Route path='/ingredient/:ingredient' element={<IngredientPage />} />
      <Route path='/browse/letter/:letter' element={<BrowseByNamePage />} />
      <Route path='/search-page' element={<SearchPage />} />
    </Route>
  )
)
