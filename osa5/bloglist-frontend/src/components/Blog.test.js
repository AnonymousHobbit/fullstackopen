import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  'title': 'Go To Statement Considered Harmful',
  'author': 'Edsger W. Dijkstra',
  'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  'likes': 5,
  'user': {
    'username': 'hobbit',
    'name': 'bohhit hobbit'
  }
}

const user = {
  'username': 'hobbit',
  'name': 'bohhit hobbit'
}

test('renders content', () => {

  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)
})

test('Shows url and likes when expanded', () => {

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)

})

test('when like is pressed same handler is called twice ', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} like={mockHandler}/>
  )
  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
