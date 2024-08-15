import { useState, ReactElement, FormEvent } from 'react'
import { Input } from './Input'
import { Button } from './Button'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function Search(): ReactElement {
  const [searchValue, setSearchValue] = useState<string>('')
  const [, setSearchParams] = useSearchParams()
  // const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault() // Prevent the default form submission
    if (searchValue.trim()) {
      setSearchParams({ query: searchValue }) // Update the URL with the search query
      navigate(`/search-page?query=${searchValue}`) // Navigate to the search results page
    }
    setSearchValue('')
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <Button
        onClick={() => navigate(-1)}
        type='button'
        className='search-result-back'
      >
        Back
      </Button>
      <section className='search-input-wrapper'>
        <Input
          className='search-input search'
          label='search'
          placeholder='search...'
          type='search'
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <Button className='search-btn' type='submit'>
          Search
        </Button>
      </section>
    </form>
  )
}
