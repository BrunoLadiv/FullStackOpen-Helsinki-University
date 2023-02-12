export default function Persons({ persons, filter, handleDelete }) {
  const fPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  return (
    <>
      {fPersons.map((person) => (
        <p key={person.id}>
          {person.name}: {person.number} <button onClick={()=> handleDelete(person.id)}>Delete</button>
        </p>
      ))}
    </>
  )
}
