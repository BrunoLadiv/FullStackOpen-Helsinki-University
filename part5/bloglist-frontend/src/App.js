import { NewBlogForm } from './components/NewBlogForm'
import { LoginForm } from './components/LoginForm'
import loginService from './services/login'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setUserPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    isError: false,
    messsage: '',
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
      setNotification({ isError: true, message: 'Wrong Credentials' })
      setTimeout(() => {
        setNotification({ isError: false, messsage: '' })
      }, 10000)
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

  function handleLike(blog) {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(blog.id, updatedBlog)

      .then((returnedBlog) => {
        setBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleBlogDelete(id, blog) {
    if (window.confirm(`Remove blog: ${blog.title} by: ${blog.author} ?`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id))
          setNotification({
            isError: false,
            message: `Blog: ${blog.title} removed `,
          })
          setTimeout(() => {
            setNotification({ isError: false, messsage: '' })
          }, 10000)
        })
        .catch((error) => {
          setNotification({
            isError: true,
            message: `Couldnt delete blog, error: ${error.message}`,
          })
          setTimeout(() => {
            setNotification({ isError: false, messsage: '' })
          }, 10000)
        })
    }
  }

  function handleNewBlog(event,newBlog,setNewBlog) {
    event.preventDefault()
    // console.log(newBlog)

    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        // setBlogs(blogs.concat(returnedBlog))
        blogService.getAll().then((updatedBlogs) => {
          setBlogs(updatedBlogs)
        })

        setNewBlog({ title: '', author: '', url: '', user: '', likes: 0 })

        setNotification({
          ...notification,
          message: `Blog: ${returnedBlog.title} by ${returnedBlog.author} added`,
        })
        setTimeout(() => {
          setNotification({ isError: false, messsage: '' })
        }, 10000)
      })
      .catch((err) => {
        setNotification({
          isError: true,
          message: `Couldnt add the blog, make sure to fill all fields `,
        })
        setTimeout(() => {
          setNotification({ isError: false, messsage: '' })
        }, 10000)
      })
  }


  return (
    <div>
      {notification.message && (
        <div
          className={`notifications ${notification.isError ? 'isError' : ''}`}
        >
          {notification.message}
        </div>
      )}
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
          <h2 style={{ display: 'inline', margin: '5px' }}>
            Logged in as {user.username}
          </h2>
          <button onClick={handleLogout}>Logout</button>
          <NewBlogForm
            handleNewBlog={handleNewBlog}
          />
          <h2>{user.username} Blogs:</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleBlogDelete={handleBlogDelete}
              />
            ))}
        </>
      )}
    </div>
  )
}

export default App
