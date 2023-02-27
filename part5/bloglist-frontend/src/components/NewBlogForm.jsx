import { useState } from 'react'
export function NewBlogForm({ handleNewBlog, setNewBlog, newBlog }) {
  const [showForm, setShowForm] = useState(false)
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
