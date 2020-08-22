import React from 'react'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      blog: {
        author: '',
        url: '',
        title: ''
      }
    }
  }

  handleBlog = evt => {
    this.setState({
      blog: {...this.state.blog, [evt.target.name] : evt.target.value},
    })
  }

  addBlog = async (evt) => {
    evt.preventDefault()
    this.props.handleSubmit(this.state.blog)
  }

  render() {

    return (
      <div>
        <h2>New Blog</h2>
        <form onSubmit={this.addBlog}>
          <label name="title">Title:</label>
          <input id="title" type="text" name="title" onChange={this.handleBlog} />
          <br />
          <label name="author">Author:</label>
          <input id="author" type="text" name="author" onChange={this.handleBlog} />
          <br />
          <label name="url">Url:</label>
          <input id="url" type="text" name="url" onChange={this.handleBlog} />
          <br />
          <button id="formBtn" type="submit">Create</button>
        </form>
      </div>
    )
  }
}

export default BlogForm
