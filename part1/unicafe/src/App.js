import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const percentage = (good / total) * 100
  return (
    <section id="statistics">
      <h1>Statistics</h1>
      <StatisticLine
        text="Good"
        value={good}
      />
      <StatisticLine
        text="Neutral"
        value={neutral}
      />
      <StatisticLine
        text="Bad"
        value={bad}
      />
      <StatisticLine
        text="Total"
        value={total}
      />
      <StatisticLine
        text="Average"
        value={average}
      />
      <StatisticLine
        text="Percentage"
        value={percentage}
      />
    </section>
  )
}
const Button = ({ setGood, setNeutral, setBad }) => {
  return (
    <>
      <button onClick={() => setGood((prevGood) => prevGood + 1)}>Good</button>
      <button onClick={() => setNeutral((prevNeutral) => prevNeutral + 1)}>
        Neutral
      </button>
      <button onClick={() => setBad((prevBad) => prevBad + 1)}>Bad</button>
    </>
  )
}
const StatisticLine = ({ text, value }) => {
  if (text === 'Average' || text === 'Percentage') {
    return (
      <h5>
        {text}: {value.toFixed(2)}
      </h5>
    )
  }
  return (
    <h5>
      {text}: {value}
    </h5>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad}
      />

      {good || neutral || bad ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
        />
      ) : (
        <h2>No feedback given yet</h2>
      )}
    </div>
  )
}

export default App
