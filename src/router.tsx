import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { App } from './components'
import { CocktailInfoPage, LandingPage, SearchPage } from './pages'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path='/cocktail-info/:id' element={<CocktailInfoPage />} />
      <Route path='/search-page' element={<SearchPage />} />
    </Route>
  )
)
