import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { voteAnek } from "../reducers/anecdoteReducer.js"


const AnecDote = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(voteAnek(id))
  }
  anecdotes.sort((a,b) => b.votes-a.votes)
  console.log(anecdotes)
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecDote
