import { useState } from 'react'

const Blog = ({ blog }) => {
  
  console.log(blog)
  const [viewBlog, setViewBlog] = useState(false)
  function handleViewBlog() {
    setViewBlog((prevViewBlog) => !prevViewBlog)
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
            Likes: {blog.likes} <button>like</button>
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
