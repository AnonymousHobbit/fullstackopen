import React from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      loginVis: false,
      formRef: React.createRef()

    }
  }


  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({blogs: blogs})
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user: user})
      blogService.setToken(user.token)
    }
  }

  handleLogin = async (evt) => {
    evt.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username, password: this.state.password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      this.setState({user: user})
      this.setState({username: ''})
      this.setState({password: ''})
    } catch (exception) {
      this.setState({error: 'wrong credentials', errClass: 'error'})
      setTimeout(() => {
        this.setState({error: null})
      }, 5000)
    }
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  handleBlog = evt => {
    this.setState({
      blog: {...this.state.blog, [evt.target.name] : evt.target.value},
    })
  }

  delete = async (evt) => {
    const result = window.confirm(`Do you want to remove ${evt.title} by ${evt.author}`)
    if (result) {
      await blogService.rem(evt.id)
      const newblogs = this.state.blogs.filter(function(item) {
        return item.id !== evt.id
      })
      this.setState({blogs: newblogs})
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({user: null})
  }

  like = async (blog) => {
    await blogService.update(blog.id, blog.likes+1)
    const newblogs = await blogService.getAll()
    this.setState({blogs: newblogs})
  }

  handleSubmit = async (evt) => {
    try {
      this.state.formRef.current.toggleVisibility()
      blogService.create(evt)

      this.setState({
        error: `New blog: ${evt.title} by ${evt.author} added`,
        blogs: this.state.blogs.concat(evt)
      })

      setTimeout(() => {
        this.setState({error: null})
      }, 5000)

    } catch(e) {

      this.setState({error: 'Something went wrong'})

      setTimeout(() => {
        this.setState({error: null})
      }, 5000)
    }

  }

  render() {

    this.state.blogs.sort((a,b) => {
      return b.likes-a.likes
    })

    const loginForm = () => (
      <Togglable buttonLabel='login'>
        <LoginForm handleChange={this.handleChange} handleLogin={this.handleLogin} state={this.state} />
      </Togglable>
    )

    const blogForm = () => (
      <Togglable buttonLabel="write" ref={this.state.formRef}>
        <BlogForm handleBlog={this.handleBlog} handleSubmit={this.handleSubmit}/>
      </Togglable>
    )

    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={this.state.error} class={this.state.errClass}/>

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p><button onClick={this.logout}>logout</button>
            {blogForm()}
            <div id="newblog">
              {this.state.blogs.map(blog =>
                <Blog key={blog.id} idkey={blog.id} blog={blog} delete={this.delete} like={this.like} user={this.state.user}/>
              )}
            </div>
          </div>
        }


      </div>
    )
  }
}

export default App
