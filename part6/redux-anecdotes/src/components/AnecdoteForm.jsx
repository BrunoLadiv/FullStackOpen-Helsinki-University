import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

export default function AnecdoteForm() {
  const dispatch = useDispatch()
  const handleNewAnecdote = async (e) => {
    e.preventDefault()
    const inputValue = e.target.anecdoteInput.value
    e.target.anecdoteInput.value = ''

    dispatch(addAnecdote(inputValue))
    dispatch(setNotificationWithTimeout(`You created ${inputValue}`, 5))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input name="anecdoteInput" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
