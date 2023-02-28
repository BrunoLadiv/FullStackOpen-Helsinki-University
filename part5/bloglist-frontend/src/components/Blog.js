import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, setNotification }) => {
  const [viewBlog, setViewBlog] = useState(false)
  function handleViewBlog() {
    setViewBlog((prevViewBlog) => !prevViewBlog)
  }
  const handleLike = (blog) => {
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
  function handleBlogDelete(id) {
    if (window.confirm(`Remove blog: ${blog.title} by: ${blog.author} ?`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id))
          setNotification({ isError: false, message: `Blog: ${blog.title} removed ` })
          setTimeout(() => {
            setNotification({ isError: false, messsage: '' })
          }, 5000)
        })
        .catch((error) => {
          setNotification({ isError: true, message: `Couldnt delete blog, error: ${error.message}` })
          setTimeout(() => {
            setNotification({ isError: false, messsage: '' })
          }, 5000)
        })
    }
  }
  return (
    <div className="blog-style">
      {!viewBlog ? (
        <>
          {blog.title} by: {blog.author}
          <button
            className="blog-btn"
            onClick={handleViewBlog}
          >
            view
          </button>
        </>
      ) : (
        <>
          <span> Title: {blog.title} </span>
          <span> Author: {blog.author}</span>
          <span> Site: <a rel='noreferrer' target='_blank' href={ blog.url.includes('https://') ? `${blog.url}`: `https://${blog.url}`}> {blog.url} </a></span>
          <span>Added by: {blog.user.username}</span>
          <span>
            Likes: {blog.likes}{' '}
            <button onClick={() => handleLike(blog)}>👍 Like</button>
          </span>

          <button
            className="blog-btn"
            onClick={handleViewBlog}
          >
            hide
          </button>
          <button
            onClick={() => handleBlogDelete(blog.id)}
            className="remove-btn"
          >
            remove
          </button>
        </>
      )}
    </div>
  )
}

export default Blog
