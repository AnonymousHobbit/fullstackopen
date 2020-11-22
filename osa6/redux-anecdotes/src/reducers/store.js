import { createStore, combineReducers, applyMiddleware } from 'redux'
import anekReducer from './anecdoteReducer'
import notReducer from './notificationReducer'
import filterReducer from './filterReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  anecdotes: anekReducer,
  notification: notReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
