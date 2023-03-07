import { useState } from 'react'

const Blog = ({ blog, handleLike, handleBlogDelete }) => {
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
            id='view'
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
          <span>
            Site:
            <a
              rel="noreferrer"
              target="_blank"
              href={
                blog.url.includes('https://')
                  ? `${blog.url}`
                  : `https://${blog.url}`
              }
            >
              {blog.url}
            </a>
          </span>
          <span>Added by: {blog.user.username}</span>
          <span>
            Likes: {blog.likes}
            <button id='like' onClick={() => handleLike(blog)}>👍 Like</button>
          </span>

          <button
            className="blog-btn"
            onClick={handleViewBlog}
          >
            hide
          </button>
          <button
            onClick={() => handleBlogDelete(blog.id, blog)}
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
