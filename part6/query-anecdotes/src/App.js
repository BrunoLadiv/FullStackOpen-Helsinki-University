import { useQuery, useMutation, useQueryClient, QueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, addVote } from './requests'
import NotificationContext  from './contexts/NotificationContext'
import { useContext } from 'react'


const App = () => {
  const [notification,dispatchNotification] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const updateVoteMutation = useMutation(addVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })
  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatchNotification({ type: 'MESSAGE', payload: `You voted for: ${anecdote.content}` })
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR' })
    }, 5000);
  }
  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
  })

  const anecdotes = result.data

  return result.isLoading ? (
    <div>Loading...</div>
  ) : result.isError ? (
    'Anecdote service not available due to problems in server'
  ) : (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
