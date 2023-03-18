import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
      anecdoteToVote.votes += 1
      state.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote: (state, action) => {
      return [...state, action.payload]
    },
    setAnecdotes: (state, action) => action.payload,
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNewAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdote.find(anecdote => anecdote.id === id)
    const updatedAnecdote = {
      ...anecdoteToVote, votes: anecdoteToVote.votes + 1
    }
    await anecdotesService.update(id, updatedAnecdote)
    dispatch(voteAnecdote(id))
  }
}



export const {voteAnecdote,  appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export default anecdotesSlice.reducer
