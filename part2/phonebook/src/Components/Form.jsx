export default function Form({
  handleFormSubmit,
  newName,
  handleNewNameChange,
  newNumber,
  handleNewNumberChange,
}) {
  return (
    <form onSubmit={handleFormSubmit}>
      <h2> Add a new:</h2>
      <div>
        <span className="name">name:</span>{' '}
        <input
          value={newName}
          onChange={handleNewNameChange}
        />
      </div>
      <div>
        number:{' '}
        <input
          value={newNumber}
          onChange={handleNewNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
