import PropTypes from 'prop-types'

export function LoginForm({
  handleLogin,
  userName,
  setUserName,
  userPassword,
  setUserPassword,
}) {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={userName}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={userPassword}
          name="Password"
          onChange={({ target }) => setUserPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}



LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUserPassword: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userPassword: PropTypes.string.isRequired
}