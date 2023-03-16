import { useSelector, useDispatch } from 'react-redux'
import { vote as anecdoteVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export default function AnecdoteList() {
  const anecdotes = useSelector((state) =>
    Array.from(state.anecdote).filter((anecdote) =>
      anecdote.content && anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    // console.log(anecdote)
    dispatch(anecdoteVote(anecdote.id))
    dispatch(setNotification(`You voted for ${anecdote.content}`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
    
  }
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
