import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const percentage = (good / total) * 100;
  

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood((prevGood) => prevGood + 1)}>Good</button>
      <button onClick={() => setNeutral((prevNeutral) => prevNeutral + 1)}>
        Neutral
      </button>
      <button onClick={() => setBad((prevBad) => prevBad + 1)}>Bad</button>
      <h1>Statistics</h1>
      <h5>Good: {good}</h5>
      <h5>Neutral: {neutral}</h5>
      <h5>Bad: {bad}</h5>
      <h5>Total: {total}</h5>
      <h5>Average: {average ? average.toFixed(3): 0}</h5>
      <h5>Positive: {percentage ? percentage.toFixed(2): 0}%</h5>
    </div>
  )
}

export default App
