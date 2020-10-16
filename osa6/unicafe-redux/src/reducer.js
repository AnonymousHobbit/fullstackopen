const initialState = {
  good: 0,
  neutral: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {

  var state = {...state}
  switch (action.type) {
    case 'GOOD':
      state.good++
      return state
    case 'NEUTRAL':
      state.neutral++
      return state
    case 'BAD':
      state.bad++
      return state
    case 'RESET':
      state.good = 0
      state.neutral = 0
      state.bad = 0
      return state
    default: return state
  }

}

export default counterReducer
