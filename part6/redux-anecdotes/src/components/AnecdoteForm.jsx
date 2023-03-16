import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'


export default function AnecdoteForm() {
  const dispatch = useDispatch()
  const handleNewAnecdote = (e) => {
    e.preventDefault()
    const inputValue = e.target.anecdoteInput.value
    e.target.anecdoteInput.value = ''
    dispatch(addAnecdote(inputValue))
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
