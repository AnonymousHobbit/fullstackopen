import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false)

  const label = visible ? 'hide' : 'view'
  return (
    <div className='blog'>
      <div className="blog-box">

        <i>{blog.title}</i> <button onClick={() => setVisible(!visible)}>{label}</button>
        <p>{blog.author}</p>
      </div>
      {visible&&(
        <div className="inside">
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button className="like" onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {own&&<button className="cancel" onClick={() => handleRemove(blog)}>remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog
