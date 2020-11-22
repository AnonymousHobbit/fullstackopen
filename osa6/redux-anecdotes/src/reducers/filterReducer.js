export const filtering = (filter) => {
  return {
    type: "FILTER",
    filter
  }
}

const reducer = (state = "ALL", action) => {
  switch (action.type) {
    case "FILTER":
      return action.filter
    default:
      return state
  }
}

export default reducer
