import { useState } from 'react'
import blogService from '../services/blogs'

export function NewBlogForm({setNotification, setBlogs, notification,blogs}) {
  const [showForm, setShowForm] = useState(false)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: '',
    likes: 0,
  })

  function handleNewBlog(event) {
    event.preventDefault()
    // console.log(newBlog)

    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({ title: '', author: '', url: '', user: '', likes: 0 })
      setNotification({...notification, message:`Blog: ${returnedBlog.title} by ${returnedBlog.author} added`})
      setTimeout(() => {
        setNotification({isError:false, messsage:''})
      }, 5000)

    }).catch(err => {
      setNotification({isError:true, message:`Couldnt add the blog, make sure to fill all fields `})
      setTimeout(() => {
        setNotification({isError:false, messsage:''})
      }, 5000)
    })
  }


  function handleShowForm() {
    setShowForm((prevShowForm) => !prevShowForm)
  }
  function handleFormSubmit(event) {
    handleNewBlog(event)
    setTimeout(() => {
      handleShowForm()
    }, 500);
  }
  return (
    <div>
      {!showForm ? (
        <button onClick={handleShowForm}>New Blog</button>
      ) : (
        <>
          
          <h2>Create New</h2>
          <form onSubmit={(event) => handleFormSubmit(event)} >
            <label>
              <p>
                Title:
                <input
                  required
                  type="text"
                  value={newBlog.title}
                  name="Title:"
                  onChange={({ target }) =>
                    setNewBlog({ ...newBlog, title: target.value })
                  }
                />
              </p>
            </label>
            <label>
              <p>
                Author:
                <input
                  required
                  type="text"
                  value={newBlog.author}
                  name="Author:"
                  onChange={({ target }) =>
                    setNewBlog({ ...newBlog, author: target.value })
                  }
                />
              </p>
            </label>
            <label>
              <p>
                Url:
                <input
                  required
                  type="text"
                  value={newBlog.url}
                  name="Url:"
                  onChange={({ target }) =>
                    setNewBlog({ ...newBlog, url: target.value })
                  }
                />
              </p>
            </label>
            <button  type="submit">Create</button>
            <button
              onClick={handleShowForm}
              style={{ display: 'block' }}
            >
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  )
}
