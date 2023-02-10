const Header = ({ course: { name } }) => <h1>{ name }</h1>

const Total = ({ course: { parts } }) => {
  const exercisesSum  = parts.reduce((acc, value) => {
    return acc + value.exercises;
  }, 0);
  
  return <p>Number of exercises {exercisesSum}</p>
}

const Part = ({ part }) => 
  <p >
    {part.name} {part.exercises}
  </p>

const Content = ({ course: { parts } }) => 
  <>
    {parts.map(part => <Part key={part.id}  part={part} />)}
  </>

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux', //supposed to add this?
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
   
      <Course course={course}/>
    
  )
}

export default App