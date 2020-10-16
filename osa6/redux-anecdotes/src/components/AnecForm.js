import React from "react"
import { useDispatch } from 'react-redux'
import { addAnek } from "../reducers/anecdoteReducer.js"


const AnecForm = () => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    dispatch(addAnek(event.target.anek.value))
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

export default AnecForm
