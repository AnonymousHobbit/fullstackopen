import { createStore, combineReducers, applyMiddleware } from 'redux'
import notReducer from './notificationReducer'
import blogReducer from './blogReducer'
import userReducer from './userReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  notification: notReducer,
  blog: blogReducer,
  user: userReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
