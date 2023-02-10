import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0 }
  ]) 
  const [newName, setNewName] = useState('')

  const handleFormSubmit = (event) => {
    event.preventDefault()
   
    if (persons.find(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    setPersons([...persons, { name: newName, id: persons.length++ }])
    setNewName('')
    
  }
  const handleNewNameChange = (event) => {
    // console.log(event) 
    setNewName(event.target.value)
    

  }
  // console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.id}>{person.name}</p>)}
    </div>
  )
}

export default App