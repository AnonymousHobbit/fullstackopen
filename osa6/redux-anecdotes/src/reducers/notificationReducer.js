export const clear = (content) => {
  return {
    type: "C_NOT",
  }
}

export const newNot = (content, time) => {
  return async dispatch => {
    const timer = setTimeout(() => {dispatch(clear(""))}, time*1000)
    dispatch({type: "NEW_NOT", data: {notification: content, timer: timer}})
  }
}

const reducer = (state = {notification:null, timer: null}, action) => {

  switch (action.type) {
    case "NEW_NOT":
      clearTimeout(state.timer)
      return {notification: action.data.notification, timer: action.data.timer}
    case "C_NOT":
      return {notification:null, timer: null}
    default:
      return state
  }
}

export default reducer
