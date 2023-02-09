import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostLikes, setMostLikes] = useState(null)

  // console.log(selected)
  function handleNextAnecdote() {
    const randIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randIndex)
  }
  function handleLike() {
    const voteCopy = [...vote]
    voteCopy[selected] += 1
    const mostLikesIndex = voteCopy.reduce(
      (a, b, i) => (voteCopy[a] > b ? a : i),
      0
    )

    setMostLikes(mostLikesIndex)
    setVotes(voteCopy)
  }
  return (
    <>
      <h1>Anecdote of the day:</h1>
      <h3>{anecdotes[selected]}</h3>
      <h5>
        Has {vote[selected]} {vote[selected] === 1 ? 'like' : 'likes'}
      </h5>

      <button onClick={handleLike}>Like 👍</button>
      <button onClick={handleNextAnecdote}>Next Anecdote</button>
      <h1>Anecdote with most likes: </h1>
      <h3>{mostLikes != null ? anecdotes[mostLikes] : 'No likes yet ☹️'}</h3>
      <h5>
        {mostLikes !== null
          ? vote[mostLikes] === 0
            ? null
            : `Has ${vote[mostLikes]} ${
                vote[mostLikes] === 1 ? 'like' : 'likes'
              }`
          : null}
      </h5>
    </>
  )
}

export default App
