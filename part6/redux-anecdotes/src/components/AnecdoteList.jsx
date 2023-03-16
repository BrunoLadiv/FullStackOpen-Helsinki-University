import { useSelector, useDispatch } from 'react-redux'
import { vote as anecdoteVote } from '../reducers/anecdoteReducer'

export default function AnecdoteList() {
  const anecdotes = useSelector((state) =>
    Array.from(state.anecdote).filter((anecdote) =>
      anecdote.content && anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    // console.log('vote', id)
    dispatch(anecdoteVote(id))
  }
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
