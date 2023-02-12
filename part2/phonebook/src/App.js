import Persons from './Components/Persons'
import Form from './Components/Form'
import { useState, useEffect } from 'react'
import Filter from './Components/Filter'

import personsServices from './services/personsServices'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const personsData = personsServices.getAll()
    personsData.then((persons) => setPersons(persons))
  }, [])
  const clearInput = () => {
    setNewName('')
    setNewNumber('')
  }
  const handleFormSubmit = (event) => {
    event.preventDefault()
    const personTofind = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    // console.log(personTofind);
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (personTofind) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, want to update the number?`
      )
      if (confirm) {
        personsServices
          .update(personTofind.id, {
            name: personTofind.name,
            number: newNumber,
          })
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== personTofind.id ? person : response.data
              )
            )
            clearInput()
          })
          .catch((err) => console.log(err))
        clearInput()
      }
    }
    if (!personTofind) {
      personsServices
        .create(newPerson)
        .then((newPerson) => setPersons([...persons, { ...newPerson }]))
        .catch((err) => console.log(err))
      clearInput()
    }
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
  const handleDelete = (personID) => {
    // console.log(personID)
    const personToDelete = persons.find((person) => person.id === personID)
    // console.log(personToDelete)
    const confirm = window.confirm(`Delete ${personToDelete.name} ?`)
    if (confirm) {
      const newArr = persons.filter((person) => person.id !== personID)
      personsServices
        .del(personID)
        .then(() => setPersons(newArr))
        .catch((err) => console.log(err))
    }
    return
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <Form
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
