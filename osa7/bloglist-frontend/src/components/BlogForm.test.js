import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

function change(cont, val) {
  fireEvent.change(cont, {
    target: { value: val }
  })
}

test('Updates', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleSubmit={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  change(author, 'Hobbit')
  change(title, 'Hobbits are friendly')
  change(url, 'https://hobbit.com')

  fireEvent.submit(form)
  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Hobbit')
  expect(createBlog.mock.calls[0][0].title).toBe('Hobbits are friendly')
  expect(createBlog.mock.calls[0][0].url).toBe('https://hobbit.com')
})
