export default function SelectedCountry({ country }) {
  
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Continent: {country.continents}</p>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h2>Languages: </h2>
      <ul>
        {Object.entries(country.languages).map((key) => {
          return <li key={key[0]}>{key[1]}</li>
        })}
      </ul>
      <img style={{border: '1px solid black'}} width={300} src={country.flags.svg} alt="country flag" />
    </>
  )
}
