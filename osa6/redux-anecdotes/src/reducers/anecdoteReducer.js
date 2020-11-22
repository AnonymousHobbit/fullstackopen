import anecService from "../services/anecdotes.js"

export const addAnek = (content) => {
  return async dispatch => {
    const anek = await anecService.addNew({content, votes: 0})
    dispatch({
      type: "NEW_ANEK",
      data: anek
    })
  }

}

export const voteAnek = (anec) => {
  return async dispatch => {
    const anek = await anecService.vote({...anec, votes: anec.votes+1})
    dispatch({
      type: "VOTE_ANEK",
      data: anek
    })
  }

}

export const initialize = (anecs) => {
  return async dispatch => {
    const anek = await anecService.getAll()
    dispatch({
      type: "INIT_ANEK",
      data: anek
    })
  }
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE_ANEK":
      const id = action.data.id
      const anek = state.find(n => n.id === id)
      return [...state.filter(n => n.id !== id), {...anek, votes: anek.votes+1}].sort((a,b) => b.votes-a.votes)
    case "NEW_ANEK":
      return [...state, action.data]
    case "INIT_ANEK":
      return action.data
    default:
      return state
  }
}

export default reducer
