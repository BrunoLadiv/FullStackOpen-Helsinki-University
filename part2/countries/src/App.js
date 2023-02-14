import { useState, useEffect } from 'react'
import axios from 'axios'
import { SearchInput } from './Components/SearchInput'
import { FilteredCountries } from './Components/FilteredCountries'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  function handleCountryChange(event) {
    setSearchCountry(event.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((r) => {
      setCountries(r.data)
    })
  }, [])

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
      )
    )
  }, [countries, searchCountry])

  return (
    <div className="App">
      <SearchInput
        searchCountry={searchCountry}
        handleCountryChange={handleCountryChange}
      />
      <FilteredCountries filteredCountries={filteredCountries} setSearchCountry={setSearchCountry} />
    </div>
  )
}

export default App
