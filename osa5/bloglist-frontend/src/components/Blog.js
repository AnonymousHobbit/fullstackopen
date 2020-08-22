import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      butText: 'view'
    }
  }

  toggleVisibility = () => {
    if (this.state.butText === 'view') {
      this.setState({
        visible: !this.state.visible,
        butText: 'hide'
      })
    } else {
      this.setState({
        visible: !this.state.visible,
        butText: 'view'
      })
    }
  }

  render() {

    const removebtn = () => {
      if (this.props.user.username === this.props.blog.user.username) {
        return (
          <div name="Remove">
            <button id="removeBtn" onClick={() => {this.props.delete(this.props.blog)}}>Remove</button>
          </div>
        )
      } else {
        return 'null'
      }
    }

    return (
      <div key={this.props.idkey} id="blogver">
        <br />
        <div>
          {this.props.blog.title} - {this.props.blog.author} <button id="viewBtn"
          className="blogver" onClick={this.toggleVisibility}>{this.state.butText}</button>
        </div>
        {!this.state.visible ? (
          null
        ) : (
          <div>
            {this.props.blog.url} <br />
             likes {this.props.blog.likes} <button id="likeBtn" onClick={() => {this.props.like(this.props.blog)}} value="like">Like</button><br />
            {this.props.blog.user.name} <br />
            {removebtn()}
          </div>
        )}

      </div>
    )
  }
}

export default Blog
