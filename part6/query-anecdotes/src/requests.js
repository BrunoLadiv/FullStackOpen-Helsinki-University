import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const newAnecdote = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

export const addVote = async (anecdote) => {
  const res = await axios.put(
    `${baseUrl}/${anecdote.id}`,
    anecdote
  );
  return res.data;
};
