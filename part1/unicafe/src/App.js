import { useState } from 'react'



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood((prevGood) => prevGood + 1)}>
        good
      </button>
      <button onClick={() => setNeutral((prevNeutral) => prevNeutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad((prevBad) => prevBad + 1)}>
        bad
      </button>
      <h1>statistics</h1>
      <h5>good: {good}</h5>
      <h5>neutral: {neutral}</h5>
      <h5>bad: {bad}</h5>
    </div>
  )
}

export default App
