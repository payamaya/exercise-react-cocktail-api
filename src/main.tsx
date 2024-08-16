import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './router'
// import { DrinkProvider } from './contexts/DrinkContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <DrinkProvider> */}
    <RouterProvider router={router}></RouterProvider>
    {/* </DrinkProvider> */}
  </StrictMode>
)
