import SelectedCountry from "./SelectedCountry"


export function FilteredCountries({ filteredCountries }) {
  return (
    <section className="filtered-countries">
      <p>
        {filteredCountries.length > 10 &&
          'Too many matches, make the filter more specific'}
      </p>
      
        {filteredCountries.length === 1 && <SelectedCountry country={filteredCountries[0]} />}
     
      {(filteredCountries.length > 1 &&
        filteredCountries.length < 10) &&
        filteredCountries.map((country) => <p key={country.name.official}> {country.name.common} </p>)}
      <p>
        {filteredCountries.length === 0 && 'No countries match your search'}
      </p>
    </section>
  )
}
