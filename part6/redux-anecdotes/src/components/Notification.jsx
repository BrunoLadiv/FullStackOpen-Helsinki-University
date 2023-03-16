import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    marginBottom: '10px'
  }
  return ( notification &&
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification