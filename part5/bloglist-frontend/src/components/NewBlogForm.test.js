import { fireEvent, render } from '@testing-library/react'
import { NewBlogForm } from './NewBlogForm'
/* eslint-disable */
describe('NewBlogForm', () => {
  it('calls the event handler with the right details when a new blog is created', () => {
    const handleNewBlogMock = jest.fn()
    const { getByLabelText, getByText } = render(
      <NewBlogForm handleNewBlog={handleNewBlogMock} />
    )

    fireEvent.click(getByText('New Blog'))

    fireEvent.change(getByLabelText('Title:'), {
      target: { value: 'Test Title' },
    })
    fireEvent.change(getByLabelText('Author:'), {
      target: { value: 'Test Author' },
    })
    fireEvent.change(getByLabelText('Url:'), {
      target: { value: 'http://testurl.com' },
    })

    fireEvent.click(getByText('Create'))

    expect(handleNewBlogMock).toHaveBeenCalledWith(
      expect.any(Object),
      {
        title: 'Test Title',
        author: 'Test Author',
        url: 'http://testurl.com',
        user: '',
        likes: 0,
      },
      expect.any(Function) // setState function
    )
  })
})
