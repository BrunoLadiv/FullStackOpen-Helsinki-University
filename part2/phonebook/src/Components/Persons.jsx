export default function Persons({ persons, filter }) {
  const fPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  return (
    <>
      {fPersons.map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}
        </p>
      ))}
    </>
  )
}
