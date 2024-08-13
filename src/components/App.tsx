import { ReactElement } from 'react'
import { Header, Search } from '.'
import { Outlet } from 'react-router-dom'
export function App(): ReactElement {
  return (
    <section className='main'>
      <Header />
      <Search />
      <Outlet />
    </section>
  )
}
