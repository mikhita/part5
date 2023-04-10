import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'mikhita',
    author: 'Mikhita'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'mikhita'
  )
})

test('clicking the view button shows blog URL and likes', async () => {
  const blog = {
    title: 'mikhita',
    author: 'Mikhita',
    url: 'mikhita.com',
    likes: 87
  }

  render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText(blog.url)).toBeInTheDocument()
  expect(screen.getByText(`${blog.likes}`)).toBeInTheDocument()
})

