import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
    return (
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            name="username"
            onChange={props.handleChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            name="password"
            onChange={props.handleChange}
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
