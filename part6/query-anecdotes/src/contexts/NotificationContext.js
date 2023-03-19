import { createContext,  useReducer } from 'react'

const NotificationContext = createContext()

const anecdoteReducer = (state, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notificationState, notificationDispatch] = useReducer(anecdoteReducer, '')

  return (
    <NotificationContext.Provider value={[notificationState, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
