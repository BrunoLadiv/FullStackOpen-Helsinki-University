const Header = ({ course }) => {
  return <h1>{course}</h1>
}
const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part
        part={props.part1.name}
        exercise={props.part1.exercises}
      />
      <Part
        part={props.part2.name}
        exercise={props.part2.exercises}
      />
      <Part
        part={props.part3.name}
        exercise={props.part3.exercises}
      />
    </>
  )
}
const Total = (props) => {
  console.log(props)
  return (
    <p>
      Number of exercises: {props.exercise1 + props.exercise2 + props.exercise3}
    </p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part}: {props.exercise}{' '}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  }

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total
        exercise1={part1.exercises}
        exercise2={part2.exercises}
        exercise3={part3.exercises}
      />
    </div>
  )
}

export default App
