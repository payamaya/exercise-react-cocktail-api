import { ReactElement, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function Header(): ReactElement {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }
  return (
    <header className='header'>
      <Link to={'/'}>
        <img className='logo' src='../src/assets/logo.png' />
      </Link>
      <nav className={`links ${isOpen ? 'open' : ''}`}>
        <Link
          onClick={(e) => {
            e.preventDefault()
            handleNavigation('/')
          }}
          to='/'
        >
          Random Drink
        </Link>

        <Link
          onClick={(e) => {
            e.preventDefault()
            handleNavigation('/search-page')
          }}
          to='/search-page'
        >
          Search Page
        </Link>
      </nav>
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  )
}
