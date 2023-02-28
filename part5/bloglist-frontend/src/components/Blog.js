import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs }) => {
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
          <span> Site: {blog.url}</span>
          <span>Added by: {blog.user.username}</span>
          <span>
            Likes: {blog.likes}{' '}
            <button onClick={() => handleLike(blog)}>like</button>
          </span>
          <button
            className="blog-btn"
            onClick={handleViewBlog}
          >
            hide
          </button>
        </>
      )}
    </div>
  )
}

export default Blog
