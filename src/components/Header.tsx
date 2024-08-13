import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export function Header(): ReactElement {
  return (
    <header className='header'>
      <Link to={'/'}>
        <img className='logo' src='../../src/assets/logo.png' />
      </Link>
      <nav className='links'>
        <Link to='/'>Random Drink</Link>
        {/* <Link to={`/cocktail-info`}>Cocktail Info Page</Link> */}
        <Link to='/search-page'>Search Drink</Link>
      </nav>
    </header>
  )
}
