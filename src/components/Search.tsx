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
      navigate(`/search?query=${searchValue}`) // Navigate to the search results page
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          label='search'
          placeholder='search...'
          type='search'
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <Button className='' type='submit'>
          Search
        </Button>
      </div>
    </form>
  )
}
