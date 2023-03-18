import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export default function AnecdoteForm() {
  const dispatch = useDispatch()
  const handleNewAnecdote = async (e) => {
    e.preventDefault()
    const inputValue = e.target.anecdoteInput.value
    e.target.anecdoteInput.value = ''

    dispatch(addAnecdote(inputValue))
    dispatch(setNotification(`You created ${inputValue}`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
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
