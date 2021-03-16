import storage from '../utils/storage'
import {newNot} from './notificationReducer'
import loginService from '../services/login'

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    console.log(user)
    newNot(`${user.username} welcome back!`)
    storage.saveUser(user)
    dispatch({type: "LOGIN", data: {user}})
  }
}

export const load_user = (username, password) => {
  return async dispatch => {
    var user = storage.loadUser()
    console.log("Loading")
    console.log(user)
    dispatch({type: "LOAD_USER", data: {user}})
  }
}

export const logout = () => {
  return async dispatch => {
    storage.logoutUser()
    console.log("Logged out")
    dispatch({type: "LOGOUT", data: {user: null}})
  }
}
const reducer = (state = [], action) => {

  switch (action.type) {
    case "LOGIN":
      return action.data.user
    case "LOAD_USER":
      return action.data.user
    case "LOGOUT":
      return action.data.user
    default:
      return state
  }
}

export default reducer
