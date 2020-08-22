import React from 'react'
import PropTypes from 'prop-types'

class LoginForm extends React.Component {
  render() {

    return (
      <form onSubmit={this.props.handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            name="username"
            onChange={this.props.handleChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            name="password"
            onChange={this.props.handleChange}
          />
        </div>
        <button id="loginBtn" type="submit">login</button>
      </form>
    )
  }
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default LoginForm
