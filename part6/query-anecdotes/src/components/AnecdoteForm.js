import { useQueryClient, useMutation } from 'react-query'
import { newAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatchNotification] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(newAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      dispatchNotification({
        type: 'MESSAGE',
        payload: error.response.data.error,
      })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR' })
      }, 5000)
    },
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
    dispatchNotification({
      type: 'MESSAGE',
      payload: `You created: ${content} `,
    })
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR' })
    }, 5000)
    // console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
