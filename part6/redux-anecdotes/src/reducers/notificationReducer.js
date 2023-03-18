import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
  },
})

export const setNotificationWithTimeout = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification(message))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, timeout * 1000)
  }
}


export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
