import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component

const blog = {
  title: 'Blog Title',
  author: 'Blog Author',
  url: 'www.test.com',
  user: 'mirek',
  likes: 5,
}

const handleBlogDelete = () => {}
const handleLike = () => {}

//eslint-disable-next-line

describe('<Blog />', () => {
  it('renders title and author, but not url or number of likes by default', () => {
    component = render(
      <Blog
        blog={blog}
        handleBlogDelete={handleBlogDelete}
        handleLike={handleLike}
      />
    )
    expect(component.container).toHaveTextContent('Blog Title')
    expect(component.container).toHaveTextContent('Blog Author')
    expect(component.container).not.toHaveTextContent('www.test.com')
    expect(component.container).not.toHaveTextContent('mirek')
    expect(component.container).not.toHaveTextContent('5')
  })

  it("that the blog URL and number of likes are shown when the 'view' button is clicked", () => {
    component = render(
      <Blog
        blog={blog}
        handleBlogDelete={handleBlogDelete}
        handleLike={handleLike}
      />
    )
    //eslint-disable-next-line
    const button = component.getByRole('button', { name: 'view' })

    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.likes)
  })
})
