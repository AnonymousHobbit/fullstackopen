import React, { useState } from 'react'
import '../styles.css'
const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div className="createField">
          <input
            id='author'
            placeholder="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="createField">
          <input
            id='title'
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="createField">
          <input
            id='url'
            placeholder="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="createBtn" id="create">create</button>
      </form>
    </div>
  )
}

export default NewBlog
