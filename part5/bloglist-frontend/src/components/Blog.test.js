import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
/* eslint-disable */
let component
const blog = {
  title: 'Blog Title',
  author: 'Blog Author',
  url: 'www.test.com',
  user: 'mirek',
  likes: 5,
}
const handleLike = jest.fn()
const handleBlogDelete = jest.fn()
beforeEach(() => {
  component = render(
    <Blog
      blog={blog}
      handleBlogDelete={handleBlogDelete}
      handleLike={handleLike}
    />
  )
})

describe('<Blog />', () => {
  it('renders title and author, but not url or number of likes by default', () => {
    expect(component.container).toHaveTextContent('Blog Title')
    expect(component.container).toHaveTextContent('Blog Author')
    expect(component.container).not.toHaveTextContent('www.test.com')
    expect(component.container).not.toHaveTextContent('mirek')
    expect(component.container).not.toHaveTextContent('5')
  })

  it("test that the blog URL and number of likes are shown when the 'view' button is clicked", () => {
    const button = component.getByRole('button', { name: 'view' })

    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  it('ensures that if the like button is clicked twice, the event handler the component received as props is called twice.', () => {
    const button = component.getByRole('button', { name: 'view' })
    fireEvent.click(button)

    const likeButton = component.getByText('👍 Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
