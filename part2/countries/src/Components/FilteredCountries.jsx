import SelectedCountry from './SelectedCountry'

export function FilteredCountries({ filteredCountries, setSearchCountry }) {
  const handleShowButton = (countryName) => {
    setSearchCountry(countryName)
  }
  return (
    <section className="filtered-countries">
      <p>
        {filteredCountries.length > 10 &&
          'Too many matches, make the filter more specific'}
      </p>

      {filteredCountries.length === 1 && (
        <SelectedCountry country={filteredCountries[0]} />
      )}

      {filteredCountries.length > 1 &&
        filteredCountries.length < 10 &&
        filteredCountries.map((country) => (
          <div key={country.name.official}>
            <h3> {country.name.common} </h3>
            <button onClick={() => handleShowButton(country.name.common)}>
              show
            </button>
          </div>
        ))}
      <p>
        {filteredCountries.length === 0 && 'No countries match your search'}
      </p>
    </section>
  )
}
