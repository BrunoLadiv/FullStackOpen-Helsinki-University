export function SearchInput({ searchCountry, handleCountryChange }) {
  return (
    <>
      <label htmlFor="searchinput">Find Countries: </label>
      <input
        name="searchinput"
        value={searchCountry}
        onChange={handleCountryChange}
      />
    </>
  )
}
