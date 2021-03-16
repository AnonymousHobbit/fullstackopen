import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'
import './styles.css'
import { connect } from 'react-redux'
import { newNot } from "./reducers/notificationReducer.js"
import { login, load_user, logout } from "./reducers/userReducer.js"
import { newBlog, initialize, likeBlog, remBlog } from "./reducers/blogReducer.js"
import { useSelector } from 'react-redux'

const App = (props) => {
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogs = useSelector(state => state.blog)
  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initialize()
  }, [])

  useEffect(() => {
    props.load_user()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.login(username, password)
      setUsername('')
      setPassword('')
    } catch(exception) {
      props.newNot('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      await props.newBlog(blog)
      console.log(blogs)
      blogFormRef.current.toggleVisibility()
      props.newNot(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (blog) => {
    const bloge = blogs.find(b => b.id === blog.id)

    await props.likeBlog(bloge)
    props.newNot(`You liked '${blog.title}' by ${blog.author}`)
  }

  const handleRemove = async (blog) => {
    const blogToRemove = blogs.find(b => b.id === blog.id)

    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await props.remBlog(blog.id)
      props.newNot(`You removed '${blog.title}' by ${blog.author}`)
      await initialize()
    }
  }

  const handleLogout = () => {
    props.logout()
  }

  if ( !user ) {
    return (
      <div className="center login">
        <h2>Login</h2>

        <Notification/>

        <form onSubmit={handleLogin}>
          <div>
            <input
              id='username'
              placeholder="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <input
              id='password'
              placeholder="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <div>


      <div className="nav">
        <p className="nav-item">{user.username}</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <div className="blogs">
        <Notification />
        <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
          <NewBlog createBlog={createBlog} />
        </Togglable>

        {blogs.sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            own={user.name===blog.user.name}
          />
        )}
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  newNot,
  newBlog,
  initialize,
  likeBlog,
  remBlog,
  login,
  load_user,
  logout
}

const ConnectedAnecDote = connect(null, mapDispatchToProps )(App)
export default ConnectedAnecDote
