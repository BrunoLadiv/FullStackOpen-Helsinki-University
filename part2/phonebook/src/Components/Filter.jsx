export default function Filter({ filter, handleFilterChange }) {
  return (
    <div>
      Filter :{' '}
      <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}
