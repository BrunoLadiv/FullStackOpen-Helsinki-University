export function NewBlogForm({ handleNewBlog, setNewBlog, newBlog }) {
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleNewBlog}>
        <label>
          <p>
            Title:
            <input
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
              type="text"
              value={newBlog.url}
              name="Url:"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, url: target.value })
              } 
            />
          </p>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
