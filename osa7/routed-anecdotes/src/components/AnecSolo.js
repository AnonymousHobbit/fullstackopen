import React from 'react'

const AnecSolo = ({ anec }) => (
  <div>
    <h2> { anec ? `${anec.content} by ${anec.author}` : `No anecdote found`}</h2>
    <p>{anec ? `Votes: ${anec.votes}` : ""}</p>
  </div>
)

export default AnecSolo
