import React, {useEffect}  from 'react'
import AnecForm from "./components/AnecForm"
import AnecDoteList from "./components/AnecDoteList"
import { useDispatch } from 'react-redux'
import { initialize } from "./reducers/anecdoteReducer.js"
import anecService from "./services/anecdotes.js"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecService
    .getAll().then(anec => dispatch(initialize(anec)))
  }, [dispatch])

  return (
    <div>
      <AnecDoteList />
      <AnecForm />
    </div>
  )
}

export default App
