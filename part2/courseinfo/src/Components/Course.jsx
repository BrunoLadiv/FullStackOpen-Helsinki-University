const Header = ({ course: { name } }) => <h1>{name}</h1>

const Total = ({ course: { parts } }) => {
  const exercisesSum = parts.reduce((acc, value) => {
    return acc + value.exercises
  }, 0)

  return <p>Number of exercises {exercisesSum}</p>
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ course: { parts } }) => (
  <>
    {parts.map((part) => (
      <Part
        key={part.id}
        part={part}
      />
    ))}
  </>
)

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
)

export default Course