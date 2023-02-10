import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0, number: "324-532432" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleFormSubmit = (event) => {
    event.preventDefault()
   
    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    setPersons([...persons, { name: newName, id: persons.length++, number: newNumber }])
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
  // console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <span className='name'>name:</span> <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>

          number: <input  value={newNumber} onChange={handleNewNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.id}>{person.name}: {person.number}</p>)}
    </div>
  )
}

export default App