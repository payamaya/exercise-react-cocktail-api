import { ReactElement } from 'react'
import { Header } from '.'
import { Outlet } from 'react-router-dom'
export function App(): ReactElement {
  return (
    <section className='main'>
      <Header />
      <Outlet />
    </section>
  )
}
