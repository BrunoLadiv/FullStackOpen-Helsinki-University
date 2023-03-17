import { createSlice } from '@reduxjs/toolkit'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
      anecdoteToVote.votes += 1
      state.sort((a, b) => b.votes - a.votes)
    },
    addAnecdote: (state, action) => {
      return [...state, action.payload]
    },
    setAnecdotes: (state, action) => action.payload,
  },
})

export const { vote, addAnecdote, setAnecdotes } = anecdotesSlice.actions

export default anecdotesSlice.reducer
