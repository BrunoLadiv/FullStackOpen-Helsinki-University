import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'www.test.com',
    user: 'mirek',
    likes: 5
  }

  const loggedUser = ''
  const handleBlogDelete = () => {}
  const handleLike = () => {}
  beforeEach(() => {
    //eslint-disable-next-line
    component = render(
      <Blog
        blog={blog}
        loggedUser={loggedUser}
        handleBlogDelete={handleBlogDelete}
        handleLike={handleLike}
      />
    )
  })

  test('renders title and author, but not url or number of likes by default', () => {
    expect(component.container).toHaveTextContent('Blog Title')
    expect(component.container).toHaveTextContent('Blog Author')
    expect(component.container).not.toHaveTextContent('www.test.com')
    expect(component.container).not.toHaveTextContent('mirek')
    expect(component.container).not.toHaveTextContent('5')
  })
})
