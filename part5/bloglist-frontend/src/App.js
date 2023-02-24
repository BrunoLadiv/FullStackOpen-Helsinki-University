import { NewBlogForm } from './components/NewBlogForm'
import { LoginForm } from './components/LoginForm'
import loginService from './services/login'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setUserPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: '',
    likes: 0,
  })

  async function handleLogin(event) {
    event.preventDefault()
    // console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      })
      // console.log('user token', user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUserName('')
      setUserPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  function handleNewBlog(event) {
    event.preventDefault()
    console.log(newBlog)

    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({ title: '', author: '', url: '', user: '', likes: 0 })
    })
  }

  return (
    <div>
      {!user ? (
        <>
          <LoginForm
            handleLogin={handleLogin}
            userName={username}
            setUserName={setUserName}
            userPassword={password}
            setUserPassword={setUserPassword}
          />
          <h2>Login to see your Blogs</h2>
        </>
      ) : (
        <>
          <NewBlogForm
            handleNewBlog={handleNewBlog}
            setNewBlog={setNewBlog}
            newBlog={newBlog}
          />
          <h2>{user.username} Blogs</h2>
          <button onClick={handleLogout}>Logout</button>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
