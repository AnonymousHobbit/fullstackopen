import React from "react"
import { connect } from 'react-redux'
import { voteAnek } from "../reducers/anecdoteReducer.js"
import { newNot } from "../reducers/notificationReducer.js"
import Notification from "./Notification"
import Filter from "./Filter"

const AnecDote = (props) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {props.anecdotes.sort((a,b) => b.votes-a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {props.voteAnek(anecdote); props.newNot("you voted: '"+anecdote.content+"'", 5)}}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === "ALL") {
    return {anecdotes: state.anecdotes}
  } else {
    return {anecdotes: state.anecdotes.filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase()))}
  }
}

const mapDispatchToProps = {
  voteAnek,
  newNot
}

const ConnectedAnecDote = connect(mapStateToProps, mapDispatchToProps )(AnecDote)
export default ConnectedAnecDote
