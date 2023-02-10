import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const fPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  // console.log(fPersons)
  // console.log(persons)
 

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    setPersons([
      ...persons,
      { name: newName, id: persons.length++, number: newNumber },
    ])
    setNewName('')
    setNewNumber('')
  }
  const handleNewNameChange = (event) => {
    // console.log(event)
    setNewName(event.target.value)
  }
  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  // console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter : <input value={filter} onChange={handleFilterChange} />
      </div>
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
      <h2>Numbers</h2>
      {fPersons.map(person => (
        <p key={person.id}>{person.name}: {person.number}</p>
      ))}
    </div>
  )
}

export default App
