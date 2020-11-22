import React from "react"
import { connect } from 'react-redux'
import { addAnek } from "../reducers/anecdoteReducer.js"
import { newNot  } from "../reducers/notificationReducer.js"

const AnecForm = (props) => {
  const add = (event) => {
    event.preventDefault()
    props.addAnek(event.target.anek.value)
    props.newNot("you added: '"+event.target.anek.value+"'", 5)
    event.target.anek.value = ""
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anek"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnek, newNot
}

const ConnectedForm = connect(null, mapDispatchToProps)(AnecForm)
export default ConnectedForm
